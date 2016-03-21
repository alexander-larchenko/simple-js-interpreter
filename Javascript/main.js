/**
 * Created by USER on 19.03.2016.
 */
'use strict';

$(document).ready(function(){

});

//(function(){

    var OPERATORS_LIST = ['+', '-', '*', '/', '(', ')'];
    var LEXEME_LIST = ['sqrt'];


    function UserCode(){};
    UserCode.prototype = {
        init: function(value) {
            this.codeString = value;
        },
        getNextStr: function() {
            if (this.codeString.length==0) return '';

            var index = 0;
            var currentCommand = '';
            var continueReading = true;
            while (continueReading) {
                if (index==this.codeString.length) break;

                var currentChar = this.codeString[index];
                if (currentChar == ' ') {
                    if (currentCommand == '') {
                        this.codeString = this.codeString.substr(1);
                        continue;
                    } else {
                        break;
                    }
                }

                if (~OPERATORS_LIST.indexOf(currentChar)) {
                    if (currentCommand == '') {
                        currentCommand = currentChar;
                        this.codeString = this.codeString.substr(currentCommand.length);
                    }
                    break;
                }

                if (currentChar=='"') {
                    if (currentCommand=='') {
                        return this.readStringSequence();
                    }
                }

                currentCommand+=currentChar;
                index++;
            }

            if (currentCommand!='') {
                this.codeString = this.codeString.substr(currentCommand.length);
            }

            return currentCommand;
        },
        readStringSequence: function() {
            if (this.codeString[0]!=='"') return false;

            //remove starting "
            this.codeString = this.codeString.substr(1);

            //get sequence until next "
            //TODO exception if string is not closed
            var resultString = this.codeString.substring(0, this.codeString.indexOf('"'));

            //remove sequence from source code
            this.codeString = this.codeString.substr(this.codeString.indexOf('"')+1);

            return resultString;
        },
        executeIfElseStatement: function  (){
            //first task - locate condition statement
            var conditionStatement = '';
            var nextStr = this.getNextStr();
            if (nextStr!='(') {
                //todo syntax error: IF should be always followed by condition
            } else {
                
            }




            //second task - locate 'then' code block
            ///TODO if block not found - syntax error

            //evaluate condition statement

            //if true - execute 'then' block

            //if false - search for 'else' block
            //  if else block found - execute it, otherwise do nothing
        },
        execute : function() {
            var argumentsStack = new Array();
            var operatorsStack = new Array();


            var nextStr = this.getNextStr();

            while (nextStr) {


                switch (nextStr) {
                    //Ignore left parenthesis
                    case '(' : break;
                    //Read token, push if operator
                    case '+':
                    case '-':
                    case '*':
                    case '/':
                    case 'sqrt': {
                        operatorsStack.push(nextStr);
                        break;
                    }
                    case 'if' : {
                        this.executeIfElseStatement();
                        break;
                    }
                    // Pop, evaluate, and push result if token is ")".
                    case ')' : {
                        //console.log("Code: "+userCode.codeString);
                        console.log("Arguments: "+argumentsStack.join(" "));
                        console.log("Operators: "+operatorsStack.join(" "));

                        var operator = operatorsStack.pop();
                        console.log("Current Action: "+operator);
                        var value = argumentsStack.pop();
                        if (operator == '+') value = argumentsStack.pop() + value;
                        else if (operator == '-') value = argumentsStack.pop() - value;
                        else if (operator == '*') value = argumentsStack.pop() * value;
                        else if (operator == '/') value = argumentsStack.pop() / value;
                        else if (operator == 'sqrt') value = Math.sqrt(value);
                        argumentsStack.push(value);
                        break;
                    }
                    // Token not operator or paren: push double value.
                    default : {
                        var floatValue = parseFloat(nextStr);
                        if (floatValue) {
                            argumentsStack.push(floatValue);
                        } else {
                            argumentsStack.push(nextStr);
                        }
                    }
                }

                nextStr = this.getNextStr();
            }

            var result = argumentsStack.pop();
            console.log("Result: " + result);
            return result;
        }
    }

    var userCode = new UserCode();

    function ExecuteCodeOnClick() {
        var code = $(".execute-text").val();
        userCode.init(code);
        userCode.execute();
    }

    function GetNextLexeme () {
        console.log("Code: "+userCode.codeString);
        var nextLexeme = userCode.getNextStr();
        console.log("Next Lexeme: "+nextLexeme);
        console.log("Code: "+userCode.codeString);
        console.log("===========================")
    }

    function ExecuteCode () {

    }

    $(".execute-button").on("click", ExecuteCodeOnClick)
    $(".get-next-code-step").on("click", ExecuteCode);

//})();