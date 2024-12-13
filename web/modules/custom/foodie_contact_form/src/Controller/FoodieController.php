<?php
namespace Drupal\foodie_contact_form\Controller;
use Drupal\Core\Controller\ControllerBase;
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
        return [
            '#markup' => '<p>Welcome! Let\'s transform ourselves with daily workouts,
            motivation, and community support in the ultimate fitness challenge.</p>',
        ];
    }
}
