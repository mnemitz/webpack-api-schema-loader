import type { LoaderContext } from 'webpack';
import { parse } from 'yaml';
import $RefParser from '@apidevtools/json-schema-ref-parser';

export default function loader(
  this: LoaderContext<unknown>,
  source: string
): void {
  const callback = this.async();

  // Parse based on file extension
  let parsedContent;
  const ext = this.resourcePath.split('.').pop()?.toLowerCase();
  
  try {
    if (ext === 'json') {
      parsedContent = JSON.parse(source);
    } else if (ext === 'yaml' || ext === 'yml') {
      parsedContent = parse(source);
    } else {
      throw new Error(`Unsupported file extension: ${ext}. Only .json, .yaml, and .yml files are supported.`);
    }
  } catch (error) {
    callback(error as Error);
    return;
  }

  // Resolve all $refs
  $RefParser.dereference(parsedContent, {
    dereference: {
      circular: true
    },
  })
    .then(result => {
      // Return the fully resolved schema as a JSON string
      const ret = `export default ${JSON.stringify(result, null, 2)};`
      callback(null, ret);
    })
    .catch(error => {
      callback(error as Error);
    });
}