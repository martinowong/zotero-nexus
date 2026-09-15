const esbuild = require('esbuild');

async function build() {
  await esbuild.build({
    bundle: true,
    format: 'iife',
    target: ['firefox115'],
    platform: 'browser',
    entryPoints: ['content/nexus.ts'],
    outfile: 'build/content/nexus.js',
    banner: { js: 'if (!Zotero.TestZoteroPlugin) {\n' },
    footer: { js: '\n}' },
  });
  console.log('Built build/content/nexus.js');
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
