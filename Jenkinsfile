pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Check required dependencies'
                bat 'npm -v'
                bat 'node -v'
            }
        }

        stage('Test') {
            steps {
                echo 'Stage 2: Unit and Integration Tests - In this stage, unit tests ensure the code performs its expected functions, while integration tests verify that different application components work cohesively.'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy to AWS CloudFormation by serverless'
                bat 'npm install -g serverless'
                bat 'serverless deploy'
            }
        }

        stage('Release') {
            steps {
                echo 'Stage 4: Deploy to Production - In this stage, the application is deployed to the production environment.'
            }
        }
    }
}
