// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting {
    address public admin;
    bool public electionActive;
    string[] public candidates;
    mapping(string => uint256) public votes; // candidate => voteCount
    mapping(string => bool) public hasVoted; // voterId => hasVoted

    event ElectionStarted();
    event ElectionEnded();
    event CandidatesUpdated(string[] newCandidates);
    event VoteCasted(string voterId, string candidate);
    event ElectionReset();

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyDuringElection() {
        require(electionActive, "Election is not active");
        _;
    }

    constructor() {
        admin = msg.sender; // Set contract deployer as admin
    }

    // 🟢 Start a new election with a fresh candidate list
    function startElection(string[] memory _candidates) public onlyAdmin {
        require(!electionActive, "An election is already active");
        require(_candidates.length > 0, "At least one candidate required");

        delete candidates; // Clear previous candidates
        for (uint256 i = 0; i < _candidates.length; i++) {
            candidates.push(_candidates[i]);
            votes[_candidates[i]] = 0; // Reset votes for new candidates
        }

        electionActive = true;
        emit ElectionStarted();
        emit CandidatesUpdated(candidates);
    }

    // 🔴 End the current election (Voting stops)
    function endElection() public onlyAdmin {
        require(electionActive, "No active election to end");
        electionActive = false;
        emit ElectionEnded();
    }

    // 🗳️ Voting function (Only during an active election)
    function vote(string memory voterId, string memory candidate) public onlyDuringElection {
        require(!hasVoted[voterId], "Voter has already voted");
        require(isValidCandidate(candidate), "Invalid candidate");

        hasVoted[voterId] = true;
        votes[candidate]++;

        emit VoteCasted(voterId, candidate);
    }

    // 🔄 Reset election data (Keeps candidates but clears votes & voters)
    function resetElection() public onlyAdmin {
        require(!electionActive, "Cannot reset during an active election");

        for (uint256 i = 0; i < candidates.length; i++) {
            votes[candidates[i]] = 0;
        }

        for (uint256 i = 0; i < candidates.length; i++) {
            hasVoted[candidates[i]] = false;
        }

        emit ElectionReset();
    }

    // 🔍 Get total votes for a candidate
    function getVotes(string memory candidate) public view returns (uint256) {
        return votes[candidate];
    }

    // 🏆 Find the candidate with the highest votes
    function getMaxVotes() public view returns (string memory winner, uint256 maxVotes) {
        maxVotes = 0;
        winner = "";
        for (uint256 i = 0; i < candidates.length; i++) {
            if (votes[candidates[i]] > maxVotes) {
                maxVotes = votes[candidates[i]];
                winner = candidates[i];
            }
        }
    }

    // 📜 Get all candidates
    function getAllCandidates() public view returns (string[] memory) {
        return candidates;
    }

    // ✅ Check if a candidate exists
    function isValidCandidate(string memory candidate) internal view returns (bool) {
        for (uint256 i = 0; i < candidates.length; i++) {
            if (keccak256(bytes(candidates[i])) == keccak256(bytes(candidate))) {
                return true;
            }
        }
        return false;
    }
}
