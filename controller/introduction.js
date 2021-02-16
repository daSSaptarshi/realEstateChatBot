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

module.exports = introduction;