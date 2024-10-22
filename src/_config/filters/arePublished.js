// https://chrisburnell.com/article/some-eleventy-filters/#published
import {isPublished} from './isPublished.js';

export const arePublished = (array) => {
	return array.filter(isPublished);
};
