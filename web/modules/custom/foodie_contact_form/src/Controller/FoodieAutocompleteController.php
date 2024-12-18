<?php

namespace Drupal\foodie_contact_form\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\foodie_contact_form\Service\WorkoutChallengeService;

/**
 * Provides an autocomplete controller for success story titles.
 */
class FoodieAutocompleteController extends ControllerBase {

  /**
   * The workout challenge service object.
   *
   * @var \Drupal\foodie_contact_form\WorkoutChallengeService
   */
  protected $workoutChallenge;

  /**
   * Constructs a FoodieAutocompleteController object.
   *
   * @param \Drupal\foodie_contact_form\WorkoutChallengeService $workout_challenge
   *   The workout challenge service for handling success story logic.
   */
  public function __construct(WorkoutChallengeService $workout_challenge) {
    $this->workoutChallenge = $workout_challenge; // Store the workout challenge service for later use.
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    // Create a new instance of the controller with the workout challenge service.
    return new static(
      $container->get('foodie_contact_form.challenge_service')
    );
  }

  /**
   * Handles the autocomplete request for success story titles.
   *
   * This method retrieves success stories based on user input and returns
   * them in a format suitable for autocomplete suggestions.
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The HTTP request object containing query parameters.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   A JSON response containing an array of suggestions.
   */
  public function handleAutocomplete(Request $request) {
    $results = []; // Initialize an array to hold the autocomplete results.
    $input = $request->query->get('q'); // Get the user input from the query parameters.

    if ($input) {
      // Fetch user success stories that match the input.
      $nodes = $this->workoutChallenge->getUserSuccessStories($input);

      if (!empty($nodes)) {
        // Loop through the nodes and prepare the results for the autocomplete.
        foreach ($nodes as $node) {
          $results[] = [
            'value' => $node->id(), // The value to be submitted.
            'label' => $node->getTitle() . ' (' . $node->id() . ')',  // The label displayed in the dropdown.
          ];
        }
      }
    }

    // Return the results as a JSON response.
    return new JsonResponse($results);
  }

}