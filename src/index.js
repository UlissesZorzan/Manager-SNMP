var  snmp  =  require  ( "net-snmp" );
const fnc = require('./functions');

/* Define parametros para iniciar o recebimento de TRAP'S*/
var options = {
    port: 162,
    disableAuthorization: true,
    accessControlModelType: snmp.AccessControlModelType.None,
    engineID: "8000B98380XXXXXXXXXXXX", 
    address: null,
    transport: "udp4"
};
 /* Função callback que recebe as TRAP'S*/
var callback = function (error, notification) {
    console.log("[SNMP]: RECEBEU NOVO PROTOCOLO - Tipo:(TRAP)!")
    if ( error ) {
        console.log("[SNMP]: ERRO NO RECEBIMENTO DE TRAP =>")
        console.error (error);
    } else {   
        fnc.processTRAP(notification);
    }
};

/* Inicialização do recebimento de TRAP'S*/
receiver = snmp.createReceiver (options, callback);
console.log("[SNMP]:Gerente SNMP Iniciado !")

module.exports = {receiver}