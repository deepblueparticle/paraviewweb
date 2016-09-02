
import { generateUUID } from '../UUID';

// ----------------------------------------------------------------------------
// Internal helpers
// ----------------------------------------------------------------------------

let generation = 0;

// ----------------------------------------------------------------------------
// Public builder method
// ----------------------------------------------------------------------------

function annotation(selection, score, weight = 1, rationale = '', name = '') {
  generation++;
  return {
    id: generateUUID(),
    generation,
    selection,
    score,
    weight,
    rationale,
    name,
  };
}

// ----------------------------------------------------------------------------

function update(annotationObject, changeSet) {
  const updatedAnnotation = Object.assign({}, annotationObject, changeSet);

  let changeDetected = false;
  Object.keys(updatedAnnotation).forEach(key => {
    if (updatedAnnotation[key] !== annotationObject[key]) {
      changeDetected = true;
    }
  });

  if (changeDetected) {
    generation++;
    updatedAnnotation.generation = generation;
  }

  return updatedAnnotation;
}

// ----------------------------------------------------------------------------

function fork(annotationObj) {
  const id = generateUUID();
  generation++;
  return Object.assign({}, annotationObj, { generation, id });
}

// ----------------------------------------------------------------------------

function markModified(annotationObject) {
  generation++;
  return Object.assign({}, annotationObject, { generation });
}


// ----------------------------------------------------------------------------
// Exposed object
// ----------------------------------------------------------------------------

export default {
  annotation,
  update,
  markModified,
  fork,
};