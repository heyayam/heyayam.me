/// <reference types="astro/client" />

declare module "*.svg" {
  const content: (props: any) => any;
  export default content;
}
