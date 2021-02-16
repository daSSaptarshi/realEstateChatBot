const express = require('express');
const router = express.Router();

const budgetArray   = ['< $20K', '$20K - $30K', '$30K - $45K', '$45K - $60K', '$60K - $80K', '$80K >'];
const bhkArray      = ['1 BHK', '2 BHK', '3 BHK', '4 BHK'];
const cityArray     = ['Kolkata', 'Bangalore', 'Chennai', 'Delhi'];
let lastResult      = {};


router.post('/', (req, res) => {

    try 
    {
        let result = introduction(req.body.question, req.body.answer);
        if (Object.keys(result).length < 1) {
            if (req.body.intent.toLowerCase() == 'buy') {
                result = buy(req.body.question, req.body.answer);
            }
            if (req.body.intent.toLowerCase() == 'sell') {
                result = sell(req.body.question, req.body.answer);
            }
            if (req.body.intent.toLowerCase() == 'general') {
                result = general(req.body.question, req.body.answer);
            }
        }

        lastResult = result;
        lastResult['errorHandled'] = false;
    } 
    catch (error) 
    {
        lastResult['errorHandled'] = true;
    }
    finally
    {
        res
        .status(200)
        .send(
            lastResult
        )
    }
    
});

const introduction = function (prevQuestion, answer) {

    const questionBank =
    {
        askName: 'Please tell me your name',
        askEmail: 'Please provide email address',
        askPhone: 'Please write your contact number',
        askCity: 'Please choose the city you live in',
        askZip: 'Tell me the zip code of your area'
    }

    if (
        ['Buy Property', 'Sell Property', 'Rent A House', 'General Query'].filter((item) =>
            item.toLowerCase().replace(' ', '') ==
            answer.toLowerCase().replace(' ', '')).length > 0
    ) {
        return {
            question: questionBank.askName,
            actionType: 'view',
            actionItems: ['Okay. Let me gather some information about yourself.'],
            actionElement: 'text'
        }
    }
    else {
        // For Name
        if (prevQuestion.toLowerCase() == questionBank.askName.toLowerCase()) {

            if (/^[a-z ]+$/.test(answer.toLowerCase())) {
                // name validated
                //ask email
                return {
                    question: questionBank.askEmail,
                    actionType: 'view',
                    actionItems: [],
                    actionElement: 'text'
                }
            }
            else {
                // name invalid
                // ask name
                return {
                    question: questionBank.askName,
                    actionType: 'view',
                    actionItems: ['Name seems incorrect'],
                    actionElement: 'text'
                }
            }
        }
        else {
            // For Email
            if (prevQuestion.toLowerCase() == questionBank.askEmail.toLowerCase()) {
                if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(answer.replace(' ', '').toLowerCase())) {
                    // email validated
                    // ask phone
                    return {
                        question: questionBank.askPhone,
                        actionType: 'view',
                        actionItems: [],
                        actionElement: 'text'
                    }
                }
                else {
                    // email invalid
                    // ask email
                    return {
                        question: questionBank.askEmail,
                        actionType: 'view',
                        actionItems: ['Email format seems to be wrong.'],
                        actionElement: 'text'
                    }
                }
            }
            else {
                // For Phone
                if (prevQuestion.toLowerCase() == questionBank.askPhone.toLowerCase()) {
                    if (/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(answer)) {
                        // phone validated
                        // ask city
                        return {
                            question: questionBank.askCity,
                            actionType: 'click',
                            actionItems: cityArray,
                            actionElement: 'button'
                        }
                    }
                    else {
                        // phone invalid
                        // ask phone
                        return {
                            question: questionBank.askPhone,
                            actionType: 'view',
                            actionItems: ['Seems incorrect'],
                            actionElement: 'text'
                        }
                    }
                }
                else {
                    // For City
                    if (prevQuestion.toLowerCase() == questionBank.askCity.toLowerCase()) {
                        if (cityArray.filter((item) => item == answer).length > 0) {
                            // city validated
                            // ask zip 
                            return {
                                question: questionBank.askZip,
                                actionType: 'view',
                                actionItems: [],
                                actionElement: 'text'
                            }
                        }
                        // else
                        // {
                        //     // city invalid
                        //     // ask city
                        //     return {
                        //         question : questionBank.askCity,
                        //         actionType : 'view',
                        //         actionItems : [],
                        //         actionElement : 'text'
                        //     }
                        // }
                    }
                    else {
                        // For zip code
                        if (prevQuestion.toLowerCase() == questionBank.askZip.toLowerCase()) {
                            if (/^[0-9]+$/.test(answer)) {
                                // zip validated
                                // ask none
                                return {}

                            }
                            else {
                                // zip invalid
                                // ask zip
                                return {
                                    question: questionBank.askZip,
                                    actionType: 'view',
                                    actionItems: ['only digits are accepted as zip code'],
                                    actionElement: 'text'
                                }
                            }
                        }
                        else {
                            return {}
                        }
                    }
                }
            }
        }
    }
}

const buy = function (prevQuestion, answer) {
    const questionBank =
    {
        askZip: 'Tell me the zip code of your area',
        askBudget: 'Choose your budget range',
        askBhk: 'How many BHK do you need?',
        askBathroom: 'How many Bathroom do you require?',
        askCity: 'Please choose the city you want to buy',
    }

    // For budget
    if (prevQuestion == questionBank.askZip) {
        return {
            question: questionBank.askBudget,
            actionType: 'click',
            actionItems: budgetArray,
            actionElement: 'button'
        }
    }
    else {
        // For BHK
        if (prevQuestion.toLowerCase() == questionBank.askBudget.toLowerCase()) {
            if (budgetArray.filter(item => item == answer).length > 0) {
                // Budget validated
                // ask BHK
                return {
                    question: questionBank.askBhk,
                    actionType: 'click',
                    actionItems: bhkArray,
                    actionElement: 'button'
                }
            }
            else {
                return { "sdvdsvsd": "sdvdsvsv" }
            }
        }
        else {
            //For Bathroom
            if (prevQuestion.toLowerCase() == questionBank.askBhk.toLowerCase()) {
                if (bhkArray.filter(item => item == answer).length > 0) {
                    // BHK Validated
                    // ask Bathroom
                    return {
                        question: questionBank.askBathroom,
                        actionType: 'click',
                        actionItems: ['1', '2', '3'],
                        actionElement: 'button'
                    }
                }
            }
            else {
                //For City
                if (prevQuestion.toLowerCase() == questionBank.askBathroom.toLowerCase()) {
                    // Bathroom Validated
                    // ask city
                    return {
                        question: questionBank.askCity,
                        actionType: 'click',
                        actionItems: cityArray,
                        actionElement: 'button'
                    }
                }
                else {
                    //For Time
                    if (prevQuestion.toLowerCase() == questionBank.askCity.toLowerCase()) {
                        // Bathroom Validated
                        // ask city
                        return {
                            question: '',
                            actionType: 'answer',
                            actionItems: ['Thank you for contacting us', 'Our agent will be contact you shortly'],
                            actionElement: 'text'
                        }
                    }
                }
            }
        }
    }
}

const sell = function (prevQuestion, answer) {
    const questionBank =
    {
        askZip: 'Tell me the zip code of your area',
        askBudget: 'Choose your expected price band',
        askBhk: 'How many BHK does your property have?',
        askBathroom: 'How many Bathroom does your property have??',
        askCity: 'Please choose the city whre your property is located',
    }

    // For budget
    if (prevQuestion == questionBank.askZip) {
        return {
            question: questionBank.askBudget,
            actionType: 'click',
            actionItems: budgetArray,
            actionElement: 'button'
        }
    }
    else {
        // For BHK
        if (prevQuestion.toLowerCase() == questionBank.askBudget.toLowerCase()) {
            if (budgetArray.filter(item => item == answer).length > 0) {
                // Budget validated
                // ask BHK
                return {
                    question: questionBank.askBhk,
                    actionType: 'click',
                    actionItems: bhkArray,
                    actionElement: 'button'
                }
            }
            else {
                return { "sdvdsvsd": "sdvdsvsv" }
            }
        }
        else {
            //For Bathroom
            if (prevQuestion.toLowerCase() == questionBank.askBhk.toLowerCase()) {
                if (bhkArray.filter(item => item == answer).length > 0) {
                    // BHK Validated
                    // ask Bathroom
                    return {
                        question: questionBank.askBathroom,
                        actionType: 'click',
                        actionItems: ['1', '2', '3'],
                        actionElement: 'button'
                    }
                }
            }
            else {
                //For City
                if (prevQuestion.toLowerCase() == questionBank.askBathroom.toLowerCase()) {
                    // Bathroom Validated
                    // ask city
                    return {
                        question: questionBank.askCity,
                        actionType: 'click',
                        actionItems: cityArray,
                        actionElement: 'button'
                    }
                }
                else {
                    //For Time
                    if (prevQuestion.toLowerCase() == questionBank.askCity.toLowerCase()) {
                        // Bathroom Validated
                        // ask city
                        return {
                            question: '',
                            actionType: 'answer',
                            actionItems: ['Thank you for contacting us', 'One of our agent will be in touch with you soon'],
                            actionElement: 'text'
                        }
                    }
                }
            }
        }
    }
}

const general = function(prevQuestion, answer)
{
    const questionBank =
    {
        askZip: 'Tell me the zip code of your area',
        askQuery: 'Please type your query and submit.',
    }

    // For Query
    if (prevQuestion == questionBank.askZip) {
        return {
            question: questionBank.askQuery,
            actionType: 'view',
            actionItems: ['We got you.'],
            actionElement: 'text'
        }
    }
    else if(prevQuestion == questionBank.askQuery)
    {
        return {
            question: '',
            actionType: 'answer',
            actionItems: ['Thank you for connecting us', 'Our agent will be in touch with you shortly'],
            actionElement: 'text'
        }
    }
}

module.exports = router