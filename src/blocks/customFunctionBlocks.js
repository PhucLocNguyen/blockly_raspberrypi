import {javascriptGenerator} from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import 'blockly/blocks'; // Import các khối mặc định
import { pythonGenerator } from 'blockly/python';
import { PINS } from './gpio';
Blockly.Blocks['define_custom_function'] = {
    init: function() {
      this.setHelpUrl('');
      this.setColour(300);
      this.appendDummyInput()
          .appendField('define function')
          .appendField(new Blockly.FieldTextInput('myFunction'), 'FUNC_NAME');
      this.appendStatementInput('DO')
          .appendField('do');
      this.setTooltip('Define a custom function that can be reused.');
    }
  };
  
  javascriptGenerator.forBlock['define_custom_function'] = function(block) {
    var functionName = block.getFieldValue('FUNC_NAME');
    var statements = javascriptGenerator.statementToCode(block, 'DO');
    var code = `function ${functionName}() {\n${statements}}\n`;
    javascriptGenerator.definitions_[functionName] = code;
    return '';
  };
  
  pythonGenerator.forBlock['define_custom_function'] = function(block) {
    var functionName = block.getFieldValue('FUNC_NAME');
    var statements = pythonGenerator.statementToCode(block, 'DO');
    var code = `def ${functionName}():\n${statements}`;
    pythonGenerator.definitions_[functionName] = code;
    return '';
  };
  // Call Custom Function Block
Blockly.Blocks['call_custom_function'] = {
    init: function() {
      this.setHelpUrl('');
      this.setColour(300);
      this.appendDummyInput()
          .appendField('call function')
          .appendField(new Blockly.FieldDropdown(function() {
            var functionNames = Blockly.getMainWorkspace().getBlocksByType('define_custom_function', false).map(block => {
              return [block.getFieldValue('FUNC_NAME'), block.getFieldValue('FUNC_NAME')];
            });
            return functionNames.length ? functionNames : [['myFunction', 'myFunction']];
          }), 'FUNC_NAME');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('Call a previously defined custom function.');
    }
  };
  
  javascriptGenerator.forBlock['call_custom_function'] = function(block) {
    var functionName = block.getFieldValue('FUNC_NAME');
    var code = `${functionName}();\n`;
    return code;
  };
  
  pythonGenerator.forBlock['call_custom_function'] = function(block) {
    var functionName = block.getFieldValue('FUNC_NAME');
    var code = `${functionName}()\n`;
    return code;
  };
  