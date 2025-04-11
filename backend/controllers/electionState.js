// electionState.js
let electionActive = false;

export function setElectionActive(value) {
  electionActive = value;
}

export function getElectionActive() {
  return electionActive;
}
