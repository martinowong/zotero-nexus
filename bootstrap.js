/* Zotero Nexus - bootstrap.js (Zotero 7/8/9) */
var NexusPlugin;

function log(msg) {
  try {
    Zotero.debug('Zotero Nexus: ' + msg);
  } catch (e) {}
}

function install() {
  log('Installed');
}

async function startup({ id, version, rootURI }) {
  log('Starting ' + version);

  await Zotero.initializationPromise;

  // Register preferences pane (Zotero 7+)
  try {
    Zotero.PreferencePanes.register({
      pluginID: 'zotero-nexus@aokellermann.dev',
      src: rootURI + 'preferences.xhtml',
      scripts: [rootURI + 'prefs.js'],
    });
  } catch (e) {
    log('PreferencePanes.register failed: ' + e);
  }

  Services.scriptloader.loadSubScript(rootURI + 'content/nexus.js');
  if (Zotero.Nexus && Zotero.Nexus.load) {
    Zotero.Nexus.load();
  }
}

function shutdown() {
  log('Shutting down');
  try {
    if (Zotero.Nexus && Zotero.Nexus.unload) {
      Zotero.Nexus.unload();
    }
  } catch (e) {}
  NexusPlugin = undefined;
}

function uninstall() {
  log('Uninstalled');
}
