var app = angular.module("StudentApp", []);

app.controller("StudentController", function ($scope, $http) {

    var API_URL = "https://gigzofzfnlyofjdsytly.supabase.co/rest/v1/students"
    var API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpZ3pvZnpmbmx5b2ZqZHN5dGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM3NTk3OTksImV4cCI6MjEwOTMzNTc5OX0.LCmW1_a8EvU_9ESoHbcCtrhA5yPhEE1N7IhkCtFkbQ4"


    var config = {
        headers: {
            "apikey": API_KEY,
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }
    };

    $scope.students = [];
    $scope.student = {};

    // READ: Fetch all students
    $scope.getStudents = function () {
        $http.get(API_URL + "?select=*", config)
            .then(function (response) {
                $scope.students = response.data;
            });
    };

    // CREATE: Add a student
    // UPDATE: Edit an existing student
    $scope.saveStudent = function () {

        if ($scope.student.id) {

            $http.patch(
                API_URL + "?id=eq." + $scope.student.id,
                {
                    name: $scope.student.name,
                    department: $scope.student.department
                },
                config
            ).then(function () {
                $scope.student = {};
                $scope.getStudents();
            });

        } else {

            $http.post(API_URL, $scope.student, config)
                .then(function () {
                    $scope.student = {};
                    $scope.getStudents();
                });

        }
    };

    // Select a student for editing
    $scope.editStudent = function (student) {
        $scope.student = angular.copy(student);
    };

    // Cancel editing
    $scope.cancelEdit = function () {
        $scope.student = {};
    };

    // DELETE: Remove a student
    $scope.deleteStudent = function (id) {
        $http.delete(API_URL + "?id=eq." + id, config)
            .then(function () {
                $scope.getStudents();
            });
    };

    // Load students when the application starts
    $scope.getStudents();

});