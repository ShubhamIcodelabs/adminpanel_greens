import reduce from 'lodash/reduce';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * Combine the given relationships objects
 *
 * See: http://jsonapi.org/format/#document-resource-object-relationships
 */
export const combinedRelationships = (oldRels, newRels) => {
  if (!oldRels && !newRels) {
    // Special case to avoid adding an empty relationships object when
    // none of the resource objects had any relationships.
    return null;
  }
  return { ...oldRels, ...newRels };
};

/**
 * Combine the given resource objects
 *
 * See: http://jsonapi.org/format/#document-resource-objects
 */
const combinedResourceObjects = (oldRes, newRes) => {
  const { id, type } = oldRes;
  if (newRes.id.uuid !== id.uuid || newRes.type !== type) {
    throw new Error('Cannot merge resource objects with different ids or types');
  }
  const attributes = newRes.attributes || oldRes.attributes;
  const attributesOld = oldRes.attributes || {};
  const attributesNew = newRes.attributes || {};
  // Allow (potentially) sparse attributes to update only relevant fields
  const attrs = attributes ? { attributes: { ...attributesOld, ...attributesNew } } : null;
  const relationships = combinedRelationships(oldRes.relationships, newRes.relationships);
  const rels = relationships ? { relationships } : null;
  return { id, type, ...attrs, ...rels };
};

const updatedEntities = (oldEntities, apiResponse) => {
  const { data, included = [] } = apiResponse;
  const objects = (Array.isArray(data) ? data : [data]).concat(included);

  const newEntities = objects.reduce((entities, curr) => {
    const { id, type } = curr;

    // Some entities (e.g. listing and user) might include extended data,
    // you should check if src/util/sanitize.js needs to be updated.

    entities[type] = entities[type] || {};
    const entity = entities[type][id.uuid];
    entities[type][id.uuid] = entity ? combinedResourceObjects({ ...entity }, curr) : curr;

    return entities;
  }, oldEntities);

  return newEntities;
};

const denormalisedEntities = (entities, resources, throwIfNotFound = true) => {
  const denormalised = resources.map(res => {
    const { id, type } = res;
    const entityFound = entities[type] && id && entities[type][id.uuid];
    if (!entityFound) {
      if (throwIfNotFound) {
        throw new Error(`Entity with type "${type}" and id "${id ? id.uuid : id}" not found`);
      }
      return null;
    }
    const entity = entities[type][id.uuid];
    const { relationships, ...entityData } = entity;
    if (relationships) {
      // Recursively join in all the relationship entities
      return reduce(
        relationships,
        (ent, relRef, relName) => {
          // A relationship reference can be either a single object or
          // an array of objects. We want to keep that form in the final
          // result.
          const hasMultipleRefs = Array.isArray(relRef.data);
          const multipleRefsEmpty = hasMultipleRefs && relRef.data.length === 0;
          if (!relRef.data || multipleRefsEmpty) {
            ent[relName] = hasMultipleRefs ? [] : null;
          } else {
            const refs = hasMultipleRefs ? relRef.data : [relRef.data];
            // If a relationship is not found, an Error should be thrown
            const rels = denormalisedEntities(entities, refs, true);
            ent[relName] = hasMultipleRefs ? rels : rels[0];
          }
          return ent;
        },
        entityData
      );
    }
    return entityData;
  });
  return denormalised.filter(e => !!e);
};

export const HomeIn = createAsyncThunk(
  'HomeIn',
  async (values, { extra: { apiClient } }) => {
    try {
      // Make a GET request to the '/adminPanel' endpoint
      const response = await apiClient.request('/api/adminPanel');
      if (response && response.data && response.data.data && response.data.data.length) {
        const listingsRef = response.data.data.map(v => ({ id: v.id, type: 'listing' }));
        const entities = updatedEntities({}, response.data);
        const denormalised = denormalisedEntities(entities, [...listingsRef]);
        return denormalised;
      }

      return response;
    } catch (e) {
      return { message: e.message };
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
}

const HomeInSlice = createSlice({
  name: 'HomeIn',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(HomeIn.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(HomeIn.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    })
    builder.addCase(HomeIn.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.error;
    })
  }
})

export default HomeInSlice.reducer;