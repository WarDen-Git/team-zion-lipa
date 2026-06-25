import { type SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { sermon } from "./sermon";
import { event } from "./event";
import { announcement } from "./announcement";
import { page } from "./page";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, sermon, event, announcement, page],
};
