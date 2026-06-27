import { type SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { sermon } from "./sermon";
import { event } from "./event";
import { announcement } from "./announcement";
import { page } from "./page";
import { leader } from "./leader";
import { ministry } from "./ministry";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, sermon, event, announcement, page, leader, ministry],
};
