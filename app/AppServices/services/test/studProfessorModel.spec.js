/*
*  This file will contains test cases for the studProfessorModel.js  services file
*  will check all test cases.
*  and will be run by karma on karma start command.
 */

    describe('Simple Model Service for Student and Professor - studProfessorModel.js', function(){

        var studProfModel;

        // Before each test, load our courseApp.AppServices module
        beforeEach( module('courseApp.AppServices') );

        // Before each test set our injected studProfessorModel service to our local studProfModel variable
        beforeEach( inject( function(studProfessorModel){
            studProfModel = studProfessorModel;
        }));

        // A simple test to verify the studProfModel service exists
        it('should Exist', function(){
            expect(studProfModel).tobeDefined();
        });
    });