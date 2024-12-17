<?php
namespace Drupal\foodie_contact_form\Controller;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
/**
* Provides a controller class for the ultimate fitness challenge page.
*/

class FoodieController extends ControllerBase {
    /**
    * Builds the fitness challenge page.
    *
    * @return array
    * A renderable array containing the markup for the page.
    */

    public function challengePage() {

      $modal_link = [
        '#type' => 'link',
        '#title' => $this->t('Submit My Success Story'),
        '#url' => Url::fromRoute('foodie_contact_form.modal_form'),  // Define the route for the modal form.
        '#attributes' => [
          'class' => ['use-ajax'],  // Enable AJAX for the link.
          'data-dialog-type' => 'modal',  // Specify that the dialog type is a modal.
          'data-dialog-options' => json_encode(['width' => 700]),  // Optional: specify modal options like width.
        ],
        '#attached' => [
          'library' => [
              'core/drupal.dialog.ajax',  // Attach the necessary core library for AJAX modals.
          ],
        ],
      ];

      $welcome_markup = [ '#markup' => '<p>Welcome! Let\'s transform ourselves with daily workouts,
      motivation, and community support in the ultimate fitness challenge.</p>' ];

      return [
        $modal_link,
        $welcome_markup
      ];
    }
}
