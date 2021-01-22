/* Função que manipula a trap recebida*/
function processTRAP(notification){
     /*Conversão de Formato para Json em String */             
     var trap = JSON.stringify(notification, null, 2);  

     /*Conversão de String para Json */       
     var jsonSNMP = JSON.parse(trap);
     
     /* Visualiza completamente TRAP recebida*/
     //console.log(jsonSNMP);
     
     /*Conversão do "value" recebido em Buffer para String e incorporação no corpo do JSON */
     let varbinds = jsonSNMP.pdu.varbinds;
     for(let i = 0; i<varbinds.length; i++){
         let value = Buffer.from(jsonSNMP.pdu.varbinds[i].value);
         value = value.toString('utf8');
         jsonSNMP.pdu.varbinds[i].value = value;
     }

     /* Informações de OID, Valor e IP de origem*/
     var OID = jsonSNMP.pdu.varbinds[0].oid;
     var Valor = jsonSNMP.pdu.varbinds[0].value;
     var ID = jsonSNMP.pdu.varbinds[1].value; 
     var IP =  jsonSNMP.rinfo.address;
     var Timestamp = Date.now();

     /* Apresentação Console*/
     console.log("\033[31m => ID:"+ID+"\033[0m OID:"+OID+" Valor:"+Valor+" IP:"+IP+ " Timestamp:"+Timestamp);       
}

module.exports = {processTRAP}