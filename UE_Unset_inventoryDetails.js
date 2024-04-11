/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 *
 */
define(["N/record", "N/email"], function (record, email) {
    function beforeLoad(context) {

      log.debug("In Beforeload funcation!!!!");
    }
    
    function beforeSubmit(context) {
     log.debug('before submit');
    }
    function afterSubmit(context) {
     
      var rec = context.newRecord;
      var soRec = record.load({
        type:'salesorder',
        id:rec.id,
        isDynamic:true
      })
      soRec.selectLine({
        sublistId: 'item',
        line: 1
      })
   

    var subrecordInvDetail = soRec.getCurrentSublistSubrecord({
        sublistId: 'item',
        fieldId: 'inventorydetail'
    });
    var lineCount = subrecordInvDetail.getLineCount({
        sublistId: 'inventoryassignment'
    })
    for(var i=0;i<lineCount;i++){

        subrecordInvDetail.selectLine({
            sublistId: 'inventoryassignment',
            line: i
          });
          subrecordInvDetail.removeLine({
            sublistId: 'inventoryassignment',
            ignoreRecalc: true
        });
        subrecordInvDetail.commitLine({
            sublistId: 'inventoryassignment'
        });    
    }
    
      soRec.commitLine({
        sublistId: 'item'
    });
   
      soRec.save();
      log.debug("sales order rec",soRec);
    }
    return {
      beforeLoad: beforeLoad,
      //beforeSubmit: beforeSubmit,
      afterSubmit: afterSubmit,
    };
  });
  