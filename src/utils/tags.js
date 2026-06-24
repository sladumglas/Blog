export function isValidTag(tag) {
  if (typeof tag !== 'string') {
    return false;
  }

  return tag.trim() !== '' && !tag.includes(' ');
}

export function hasValidTags(article) {
  if (!Array.isArray(article.tagList)) {
    return false;
  }

  return article.tagList.length > 0 && article.tagList.every(isValidTag);
}

export function getValidTags(tags) {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags.filter(isValidTag);
}