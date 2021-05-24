(this.webpackJsonpwakumono=this.webpackJsonpwakumono||[]).push([[20],{1252:function(t,e,n){"use strict";n.d(e,"a",(function(){return c})),n.d(e,"b",(function(){return h})),n.d(e,"c",(function(){return u})),n.d(e,"d",(function(){return s})),n.d(e,"e",(function(){return l}));var r={},o={},i=function(t,e){o[t]=e},a=function(t){var e=function(e,n){Object.assign(this,n),this.name=t,this.message=e||t,this.stack=(new Error).stack};return e.prototype=new Error,r[t]=e,e};a("AccountNameRequired"),a("AccountNotSupported"),a("AmountRequired"),a("BluetoothRequired"),a("BtcUnmatchedApp"),a("CantOpenDevice"),a("CashAddrNotSupported"),a("CurrencyNotSupported"),a("DeviceAppVerifyNotSupported"),a("DeviceGenuineSocketEarlyClose"),a("DeviceNotGenuine"),a("DeviceOnDashboardExpected"),a("DeviceOnDashboardUnexpected"),a("DeviceInOSUExpected"),a("DeviceHalted"),a("DeviceNameInvalid"),a("DeviceSocketFail"),a("DeviceSocketNoBulkStatus"),a("DisconnectedDevice"),a("DisconnectedDeviceDuringOperation"),a("EnpointConfig");var c=a("EthAppPleaseEnableContractData"),s=(a("FeeEstimationFailed"),a("FirmwareNotRecognized"),a("HardResetFail"),a("InvalidXRPTag"),a("InvalidAddress"),a("InvalidAddressBecauseDestinationIsAlsoSource"),a("LatestMCUInstalledError"),a("UnknownMCU"),a("LedgerAPIError"),a("LedgerAPIErrorWithMessage"),a("LedgerAPINotAvailable"),a("ManagerAppAlreadyInstalled"),a("ManagerAppRelyOnBTC"),a("ManagerAppDepInstallRequired"),a("ManagerAppDepUninstallRequired"),a("ManagerDeviceLocked"),a("ManagerFirmwareNotEnoughSpace"),a("ManagerNotEnoughSpace"),a("ManagerUninstallBTCDep"),a("NetworkDown"),a("NoAddressesFound"),a("NotEnoughBalance"),a("NotEnoughBalanceToDelegate"),a("NotEnoughBalanceInParentAccount"),a("NotEnoughSpendableBalance"),a("NotEnoughBalanceBecauseDestinationNotCreated"),a("NoAccessToCamera"),a("NotEnoughGas"),a("NotSupportedLegacyAddress"),a("GasLessThanEstimate"),a("PasswordsDontMatch"),a("PasswordIncorrect"),a("RecommendSubAccountsToEmpty"),a("RecommendUndelegation"),a("TimeoutTagged"),a("UnexpectedBootloader"),a("MCUNotGenuineToDashboard"),a("RecipientRequired"),a("UnavailableTezosOriginatedAccountReceive"),a("UnavailableTezosOriginatedAccountSend"),a("UpdateFetchFileFail"),a("UpdateIncorrectHash"),a("UpdateIncorrectSig"),a("UpdateYourApp"),a("UserRefusedDeviceNameChange"),a("UserRefusedAddress"),a("UserRefusedFirmwareUpdate"),a("UserRefusedAllowManager"),a("UserRefusedOnDevice"),a("TransportOpenUserCancelled"),a("TransportInterfaceNotAvailable"),a("TransportRaceCondition"));a("TransportWebUSBGestureRequired"),a("DeviceShouldStayInApp"),a("WebsocketConnectionError"),a("WebsocketConnectionFailed"),a("WrongDeviceForAccount"),a("WrongAppForCurrency"),a("ETHAddressNonEIP"),a("CantScanQRCode"),a("FeeNotLoaded"),a("FeeRequired"),a("FeeTooHigh"),a("SyncError"),a("PairingFailed"),a("GenuineCheckFailed"),a("LedgerAPI4xx"),a("LedgerAPI5xx"),a("FirmwareOrAppUpdateRequired"),a("NoDBPathGiven"),a("DBWrongPassword"),a("DBNotReset");function u(t,e){this.name="TransportError",this.message=t,this.stack=(new Error).stack,this.id=e}u.prototype=new Error,i("TransportError",(function(t){return new u(t.message,t.id)}));var h={PIN_REMAINING_ATTEMPTS:25536,INCORRECT_LENGTH:26368,MISSING_CRITICAL_PARAMETER:26624,COMMAND_INCOMPATIBLE_FILE_STRUCTURE:27009,SECURITY_STATUS_NOT_SATISFIED:27010,CONDITIONS_OF_USE_NOT_SATISFIED:27013,INCORRECT_DATA:27264,NOT_ENOUGH_MEMORY_SPACE:27268,REFERENCED_DATA_NOT_FOUND:27272,FILE_ALREADY_EXISTS:27273,INCORRECT_P1_P2:27392,INS_NOT_SUPPORTED:27904,CLA_NOT_SUPPORTED:28160,TECHNICAL_PROBLEM:28416,OK:36864,MEMORY_PROBLEM:37440,NO_EF_SELECTED:37888,INVALID_OFFSET:37890,FILE_NOT_FOUND:37892,INCONSISTENT_FILE:37896,ALGORITHM_NOT_SUPPORTED:38020,INVALID_KCV:38021,CODE_NOT_INITIALIZED:38914,ACCESS_CONDITION_NOT_FULFILLED:38916,CONTRADICTION_SECRET_CODE_STATUS:38920,CONTRADICTION_INVALIDATION:38928,CODE_BLOCKED:38976,MAX_VALUE_REACHED:38992,GP_AUTH_FAILED:25344,LICENSING:28482,HALTED:28586};function l(t){this.name="TransportStatusError";var e=Object.keys(h).find((function(e){return h[e]===t}))||"UNKNOWN_ERROR",n=function(t){switch(t){case 26368:return"Incorrect length";case 26624:return"Missing critical parameter";case 27010:return"Security not satisfied (dongle locked or have invalid access rights)";case 27013:return"Condition of use not satisfied (denied by the user?)";case 27264:return"Invalid data received";case 27392:return"Invalid parameter received"}if(28416<=t&&t<=28671)return"Internal error, please report"}(t)||e,r=t.toString(16);this.message="Ledger device: "+n+" (0x"+r+")",this.stack=(new Error).stack,this.statusCode=t,this.statusText=e}l.prototype=new Error,i("TransportStatusError",(function(t){return new l(t.statusCode)}))},1862:function(t,e,n){"use strict";n.r(e),function(t){n.d(e,"default",(function(){return l}));var r=n(4),o=n(6),i=n(1863),a=n(1252),c=(n(139),n(137)),s={eth:1,erc20:2,erc721:3,erc20mintable:4,erc721mintable:5};function u(e){return t.from(e.startsWith("0x")?e.slice(2):e,"hex")}function h(t){return t?u(t):null}var l=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"w0w";Object(r.a)(this,e),this.transport=void 0,this.transport=t,t.decorateAppAPIMethods(this,["getAddress","provideERC20TokenInformation","signTransaction","signPersonalMessage","getAppConfiguration","signEIP712HashedMessage","starkGetPublicKey","starkSignOrder","starkSignOrder_v2","starkSignTransfer","starkSignTransfer_v2","starkProvideQuantum","starkProvideQuantum_v2","starkUnsafeSign","eth2GetPublicKey","eth2SetWithdrawalIndex"],n)}return Object(o.a)(e,[{key:"getAddress",value:function(e,n,r){var o=Object(i.b)(e),a=t.alloc(1+4*o.length);return a[0]=o.length,o.forEach((function(t,e){a.writeUInt32BE(t,1+4*e)})),this.transport.send(224,2,n?1:0,r?1:0,a).then((function(t){var e={},n=t[0],o=t[1+n];return e.publicKey=t.slice(1,1+n).toString("hex"),e.address="0x"+t.slice(1+n+1,1+n+1+o).toString("ascii"),r&&(e.chainCode=t.slice(1+n+1+o,1+n+1+o+32).toString("hex")),e}))}},{key:"provideERC20TokenInformation",value:function(t){var e=t.data;return this.transport.send(224,10,0,0,e).then((function(){return!0}),(function(t){if(t&&27904===t.statusCode)return!1;throw t}))}},{key:"signTransaction",value:function(e,n){var r,o=this,s=Object(i.b)(e),u=0,h=t.from(n,"hex"),l=[],d=Object(c.decode)(h),p=0,g="";if(d.length>6){var f=Object(c.encode)(d.slice(-3));p=h.length-(f.length-1);var E=d[6],S=t.alloc(4);E.copy(S,4-E.length),(g=(2*S.readUInt32BE(0)+35).toString(16).slice(0,-2)).length%2===1&&(g="0"+g)}for(var v=function(){var e=0===u?149-4*s.length:150,n=u+e>h.length?h.length-u:e;0!=p&&u+n==p&&n--;var r=t.alloc(0===u?1+4*s.length+n:n);0===u?(r[0]=s.length,s.forEach((function(t,e){r.writeUInt32BE(t,1+4*e)})),h.copy(r,1+4*s.length,u,u+n)):h.copy(r,0,u,u+n),l.push(r),u+=n};u!==h.length;)v();return Object(i.a)(l,(function(t,e){return o.transport.send(224,4,0===e?0:128,0,t).then((function(t){r=t}))})).then((function(){return{v:g+r.slice(0,1).toString("hex"),r:r.slice(1,33).toString("hex"),s:r.slice(33,65).toString("hex")}}),(function(t){throw function(t){return t&&27264===t.statusCode?new a.a("Please enable Contract data on the Ethereum app Settings"):t}(t)}))}},{key:"getAppConfiguration",value:function(){return this.transport.send(224,6,0,0).then((function(t){var e={};return e.arbitraryDataEnabled=1&t[0],e.erc20ProvisioningNecessary=2&t[0],e.starkEnabled=4&t[0],e.starkv2Supported=8&t[0],e.version=t[1]+"."+t[2]+"."+t[3],e}))}},{key:"signPersonalMessage",value:function(e,n){for(var r,o=this,a=Object(i.b)(e),c=0,s=t.from(n,"hex"),u=[],h=function(){var e=0===c?149-4*a.length-4:150,n=c+e>s.length?s.length-c:e,r=t.alloc(0===c?1+4*a.length+4+n:n);0===c?(r[0]=a.length,a.forEach((function(t,e){r.writeUInt32BE(t,1+4*e)})),r.writeUInt32BE(s.length,1+4*a.length),s.copy(r,1+4*a.length+4,c,c+n)):s.copy(r,0,c,c+n),u.push(r),c+=n};c!==s.length;)h();return Object(i.a)(u,(function(t,e){return o.transport.send(224,8,0===e?0:128,0,t).then((function(t){r=t}))})).then((function(){return{v:r[0],r:r.slice(1,33).toString("hex"),s:r.slice(33,65).toString("hex")}}))}},{key:"signEIP712HashedMessage",value:function(e,n,r){var o=u(n),a=u(r),c=Object(i.b)(e),s=t.alloc(1+4*c.length+32+32,0),h=0;return s[0]=c.length,c.forEach((function(t,e){s.writeUInt32BE(t,1+4*e)})),h=1+4*c.length,o.copy(s,h),h+=32,a.copy(s,h),this.transport.send(224,12,0,0,s).then((function(t){return{v:t[0],r:t.slice(1,33).toString("hex"),s:t.slice(33,65).toString("hex")}}))}},{key:"starkGetPublicKey",value:function(e,n){var r=Object(i.b)(e),o=t.alloc(1+4*r.length);return o[0]=r.length,r.forEach((function(t,e){o.writeUInt32BE(t,1+4*e)})),this.transport.send(240,2,n?1:0,0,o).then((function(t){return t.slice(0,t.length-2)}))}},{key:"starkSignOrder",value:function(e,n,r,o,a,c,s,u,l,d,p){var g=h(n),f=h(o),E=Object(i.b)(e),S=t.alloc(1+4*E.length+20+32+20+32+4+4+8+8+4+4,0),v=0;return S[0]=E.length,E.forEach((function(t,e){S.writeUInt32BE(t,1+4*e)})),v=1+4*E.length,g&&g.copy(S,v),v+=20,t.from(r.toString(16).padStart(64,"0"),"hex").copy(S,v),v+=32,f&&f.copy(S,v),v+=20,t.from(a.toString(16).padStart(64,"0"),"hex").copy(S,v),v+=32,S.writeUInt32BE(c,v),v+=4,S.writeUInt32BE(s,v),v+=4,t.from(u.toString(16).padStart(16,"0"),"hex").copy(S,v),v+=8,t.from(l.toString(16).padStart(16,"0"),"hex").copy(S,v),v+=8,S.writeUInt32BE(d,v),v+=4,S.writeUInt32BE(p,v),this.transport.send(240,4,1,0,S).then((function(t){return{r:t.slice(1,33).toString("hex"),s:t.slice(33,65).toString("hex")}}))}},{key:"starkSignOrder_v2",value:function(e,n,r,o,a,c,u,l,d,p,g,f,E,S,v){var I=h(n),T=h(c);if(!(r in s))throw new Error("eth.starkSignOrderv2 invalid source quantization type="+r);if(!(u in s))throw new Error("eth.starkSignOrderv2 invalid destination quantization type="+u);var y=Object(i.b)(e),O=t.alloc(1+4*y.length+1+20+32+32+1+20+32+32+4+4+8+8+4+4,0),N=0;return O[0]=y.length,y.forEach((function(t,e){O.writeUInt32BE(t,1+4*e)})),N=1+4*y.length,O[N]=s[r],N++,I&&I.copy(O,N),N+=20,o&&t.from(o.toString(16).padStart(64,"0"),"hex").copy(O,N),N+=32,a&&t.from(a.toString(16).padStart(64,"0"),"hex").copy(O,N),O[N+=32]=s[u],N++,T&&T.copy(O,N),N+=20,l&&t.from(l.toString(16).padStart(64,"0"),"hex").copy(O,N),N+=32,d&&t.from(d.toString(16).padStart(64,"0"),"hex").copy(O,N),N+=32,O.writeUInt32BE(p,N),N+=4,O.writeUInt32BE(g,N),N+=4,t.from(f.toString(16).padStart(16,"0"),"hex").copy(O,N),N+=8,t.from(E.toString(16).padStart(16,"0"),"hex").copy(O,N),N+=8,O.writeUInt32BE(S,N),N+=4,O.writeUInt32BE(v,N),this.transport.send(240,4,3,0,O).then((function(t){return{r:t.slice(1,33).toString("hex"),s:t.slice(33,65).toString("hex")}}))}},{key:"starkSignTransfer",value:function(e,n,r,o,a,c,s,l,d){var p=h(n),g=u(o),f=Object(i.b)(e),E=t.alloc(1+4*f.length+20+32+32+4+4+8+4+4,0),S=0;return E[0]=f.length,f.forEach((function(t,e){E.writeUInt32BE(t,1+4*e)})),S=1+4*f.length,p&&p.copy(E,S),S+=20,t.from(r.toString(16).padStart(64,"0"),"hex").copy(E,S),S+=32,g.copy(E,S),S+=32,E.writeUInt32BE(a,S),S+=4,E.writeUInt32BE(c,S),S+=4,t.from(s.toString(16).padStart(16,"0"),"hex").copy(E,S),S+=8,E.writeUInt32BE(l,S),S+=4,E.writeUInt32BE(d,S),this.transport.send(240,4,2,0,E).then((function(t){return{r:t.slice(1,33).toString("hex"),s:t.slice(33,65).toString("hex")}}))}},{key:"starkSignTransfer_v2",value:function(e,n,r,o,a,c,l,d,p,g,f,E,S){var v=h(n),I=u(c),T=h(E);if(!(r in s))throw new Error("eth.starkSignTransferv2 invalid quantization type="+r);var y=Object(i.b)(e),O=t.alloc(1+4*y.length+1+20+32+32+32+4+4+8+4+4+(T?52:0),0),N=0;return O[0]=y.length,y.forEach((function(t,e){O.writeUInt32BE(t,1+4*e)})),N=1+4*y.length,O[N]=s[r],N++,v&&v.copy(O,N),N+=20,o&&t.from(o.toString(16).padStart(64,"0"),"hex").copy(O,N),N+=32,a&&t.from(a.toString(16).padStart(64,"0"),"hex").copy(O,N),N+=32,I.copy(O,N),N+=32,O.writeUInt32BE(l,N),N+=4,O.writeUInt32BE(d,N),N+=4,t.from(p.toString(16).padStart(16,"0"),"hex").copy(O,N),N+=8,O.writeUInt32BE(g,N),N+=4,O.writeUInt32BE(f,N),T&&S&&(N+=4,t.from(S.toString(16).padStart(64,"0"),"hex").copy(O,N),N+=32,T.copy(O,N)),this.transport.send(240,4,T?5:4,0,O).then((function(t){return{r:t.slice(1,33).toString("hex"),s:t.slice(33,65).toString("hex")}}))}},{key:"starkProvideQuantum",value:function(e,n){var r=h(e),o=t.alloc(52,0);return r&&r.copy(o,0),t.from(n.toString(16).padStart(64,"0"),"hex").copy(o,20),this.transport.send(240,8,0,0,o).then((function(){return!0}),(function(t){if(t&&27904===t.statusCode)return!1;throw t}))}},{key:"starkProvideQuantum_v2",value:function(e,n,r,o){var i=h(e);if(!(n in s))throw new Error("eth.starkProvideQuantumV2 invalid quantization type="+n);var a=t.alloc(84,0),c=0;return i&&i.copy(a,c),c+=20,r&&t.from(r.toString(16).padStart(64,"0"),"hex").copy(a,c),c+=32,o&&t.from(o.toString(16).padStart(64,"0"),"hex").copy(a,c),this.transport.send(240,8,s[n],0,a).then((function(){return!0}),(function(t){if(t&&27904===t.statusCode)return!1;throw t}))}},{key:"starkUnsafeSign",value:function(e,n){var r,o=u(n),a=Object(i.b)(e),c=t.alloc(1+4*a.length+32);return c[0]=a.length,a.forEach((function(t,e){c.writeUInt32BE(t,1+4*e)})),r=1+4*a.length,o.copy(c,r),this.transport.send(240,10,0,0,c).then((function(t){return{r:t.slice(1,33).toString("hex"),s:t.slice(33,65).toString("hex")}}))}},{key:"eth2GetPublicKey",value:function(e,n){var r=Object(i.b)(e),o=t.alloc(1+4*r.length);return o[0]=r.length,r.forEach((function(t,e){o.writeUInt32BE(t,1+4*e)})),this.transport.send(224,14,n?1:0,0,o).then((function(t){var e={};return e.publicKey=t.slice(0,-2).toString("hex"),e}))}},{key:"eth2SetWithdrawalIndex",value:function(e){var n=t.alloc(4,0);return n.writeUInt32BE(e,0),this.transport.send(224,16,0,0,n).then((function(){return!0}),(function(t){if(t&&27904===t.statusCode)return!1;throw t}))}}]),e}()}.call(this,n(14).Buffer)},1863:function(t,e,n){"use strict";function r(t){var e=[];return t.split("/").forEach((function(t){var n=parseInt(t,10);isNaN(n)||(t.length>1&&"'"===t[t.length-1]&&(n+=2147483648),e.push(n))})),e}function o(t,e){function n(t,r,o){return t>=r.length?o:e(r[t],t).then((function(e){return o.push(e),n(t+1,r,o)}))}return Promise.resolve().then((function(){return n(0,t,[])}))}n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return o}))}}]);
//# sourceMappingURL=20.ef0b1151.chunk.js.map