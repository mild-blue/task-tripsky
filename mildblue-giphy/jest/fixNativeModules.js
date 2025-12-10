const nativeModules = jest.requireActual(
	"react-native/Libraries/BatchedBridge/NativeModules"
);

if (!nativeModules || typeof nativeModules !== "object") {
	throw new Error("NativeModules shim expected an object export");
}

if (!("default" in nativeModules)) {
	Object.defineProperty(nativeModules, "default", {
		configurable: true,
		enumerable: false,
		get: () => nativeModules,
	});
}

if (!nativeModules.NativeUnimoduleProxy) {
	nativeModules.NativeUnimoduleProxy = {
		modulesConstants: {},
		viewManagersMetadata: {},
	};
} else {
	nativeModules.NativeUnimoduleProxy.modulesConstants =
		nativeModules.NativeUnimoduleProxy.modulesConstants || {};
	nativeModules.NativeUnimoduleProxy.viewManagersMetadata =
		nativeModules.NativeUnimoduleProxy.viewManagersMetadata || {};
}

if (!nativeModules.UIManager) {
	nativeModules.UIManager = {};
}

module.exports = nativeModules;
