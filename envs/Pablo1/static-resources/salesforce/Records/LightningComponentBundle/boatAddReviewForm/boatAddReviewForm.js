import { LightningElement , api} from 'lwc';

const TOAST_TITLE = 'Review Created!';
const TOAST_SUCCESS_VARIANT = 'success';

import { ShowToastEvent } from 'lightning/platformShowToastEvent'

// imports
export default class BoatAddReviewForm extends LightningElement {
    // Private
    boatId;
    rating = 0;
    
    // Public Getter and Setter to allow for logic to run on recordId change
    @api 
    get recordId() { }
    set recordId(value) {
        this.boatId = value;
      //sets boatId attribute
      //sets boatId assignment
    }
    
    // Gets user rating input from stars component
    handleRatingChanged(event) { 
        console.log('rating changed!',event.detail);
        this.rating = event.detail;
        //set rating to rating
    }
    
    // Custom submission handler to properly set Rating
    // This function must prevent the anchor element from navigating to a URL.
    // form to be submitted: lightning-record-edit-form
    handleSubmit(event) {
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        fields.Boat__c = this.boatId;
        fields.Rating__c = this.rating;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }
    
    // Shows a toast message once form is submitted successfully
    // Dispatches event when a review is created
    handleSuccess() {
      // TODO: dispatch the custom event and show the success message
        this.dispatchEvent(
            new ShowToastEvent({
                title: TOAST_TITLE,
                message: 'Ship It!',
                variant: TOAST_SUCCESS_VARIANT
            })
        );

        const createReviewEvent = new CustomEvent('createreview');
        createReviewEvent;
        this.dispatchEvent(createReviewEvent);
        console.log('form dispatched event');

        this.handleReset();
    }
    
    // Clears form data upon submission
    // TODO: it must reset each lightning-input-field
    handleReset() { 
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
    }
  }