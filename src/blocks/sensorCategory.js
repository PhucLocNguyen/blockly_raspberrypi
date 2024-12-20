import {javascriptGenerator} from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import 'blockly/blocks'; // Import các khối mặc định
import { pythonGenerator } from 'blockly/python';
import { PINS } from './pinCategory';
// Temperature Sensor Read Block// Định nghĩa block 'temperature_sensor_read'
Blockly.Blocks['temperature_sensor_read'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(60);
    this.appendDummyInput()
        .appendField('%{BKY_TEMPERATURE_SENSOR_READ}')
        .appendField(new Blockly.FieldDropdown(PINS), 'PIN');
    this.setOutput(true, 'Number');
    this.setTooltip('%{BKY_TEMPERATURE_SENSOR_READ_TOOLTIP}');
  }
};

javascriptGenerator.forBlock['temperature_sensor_read'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var code = `readTemperature(${pin})`;
  return [code, javascriptGenerator.ORDER_ATOMIC];
};

pythonGenerator.forBlock['temperature_sensor_read'] = function(block) {
  var pin = block.getFieldValue('PIN');
  pythonGenerator.definitions_['import_gpio'] = 'import RPi.GPIO as GPIO\n';
  pythonGenerator.definitions_['import_temp_sensor'] = 'import Adafruit_DHT\n';
  var code = `Adafruit_DHT.read(Adafruit_DHT.DHT22, ${pin})[1]`;
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Định nghĩa block 'ultrasonic_sensor_trigger'
Blockly.Blocks['ultrasonic_sensor_trigger'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(60);
    this.appendDummyInput()
        .appendField('%{BKY_ULTRASONIC_SENSOR_TRIGGER}')
        .appendField(new Blockly.FieldDropdown(PINS), 'TRIG_PIN')
        .appendField('%{BKY_ULTRASONIC_SENSOR_ECHO}')
        .appendField(new Blockly.FieldDropdown(PINS), 'ECHO_PIN');
    this.setOutput(true, 'Number');
    this.setTooltip('%{BKY_ULTRASONIC_SENSOR_TRIGGER_TOOLTIP}');
  }
};

javascriptGenerator.forBlock['ultrasonic_sensor_trigger'] = function(block) {
  var trigPin = block.getFieldValue('TRIG_PIN');
  var echoPin = block.getFieldValue('ECHO_PIN');
  var code = `readUltrasonicDistance(${trigPin}, ${echoPin})`;
  return [code, javascriptGenerator.ORDER_ATOMIC];
};

pythonGenerator.forBlock['ultrasonic_sensor_trigger'] = function(block) {
  var trigPin = block.getFieldValue('TRIG_PIN');
  var echoPin = block.getFieldValue('ECHO_PIN');
  pythonGenerator.definitions_['import_gpio'] = 'import RPi.GPIO as GPIO\n';
  pythonGenerator.definitions_['import_time'] = 'import time\n';
  pythonGenerator.definitions_['calculator_distance'] = `def calculate_distance(trigPin, echoPin):\n    GPIO.setup(trigPin, GPIO.OUT)\n    GPIO.setup(echoPin, GPIO.IN)\n    GPIO.output(trigPin, True)\n    time.sleep(0.00001)\n    GPIO.output(trigPin, False)\n    while GPIO.input(echoPin) == 0:\n        pulse_start = time.time()\n    while GPIO.input(echoPin) == 1:\n        pulse_end = time.time()\n    pulse_duration = pulse_end - pulse_start\n    distance = pulse_duration * 17150\n    return round(distance, 2)\n`;
  var code = `calculate_distance(${trigPin}, ${echoPin})`;
  return [code, pythonGenerator.ORDER_ATOMIC];
};

// Định nghĩa block 'angular_servo'
Blockly.Blocks['angular_servo'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(120);
    this.appendDummyInput()
        .appendField('%{BKY_ANGULAR_SERVO_SET}')
        .appendField(new Blockly.FieldDropdown(PINS), 'PIN')
        .appendField('%{BKY_ANGULAR_SERVO_ANGLE}')
        .appendField(new Blockly.FieldNumber(0, 0, 180), 'ANGLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('%{BKY_ANGULAR_SERVO_TOOLTIP}');
  }
};

javascriptGenerator.forBlock['angular_servo'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var angle = block.getFieldValue('ANGLE');
  var code = `setAngularServo(${pin}, ${angle});\n`;
  return code;
};

pythonGenerator.forBlock['angular_servo'] = function(block) {
  var pin = block.getFieldValue('PIN');
  var angle = block.getFieldValue('ANGLE');
  pythonGenerator.definitions_['import_gpiozero'] = 'from gpiozero import AngularServo\n';
  var setup_code = `servo = AngularServo(${pin}, min_angle=0, max_angle=180)\n`;
  var code = `${setup_code}servo.angle = ${angle}\n`;
  return code;
};