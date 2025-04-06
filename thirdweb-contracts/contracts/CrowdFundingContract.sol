// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFundingContract {
    struct Campaign {
        string title;
        string description;
        uint256 goal;
        uint256 moneyRaised;
        uint256 deadline;
        address owner;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public campaignsCount = 0;

    /**
     * @dev Creates a new campaign with the provided details.
     * @param _title Title of the campaign.
     * @param _description Description of the campaign.
     * @param _owner Address of the campaign owner.
     * @param _goal Funding goal for the campaign.
     * @param _deadline Deadline for the campaign in UNIX timestamp.
     * @param _image URL of the campaign image.
     * @return The ID of the newly created campaign.
     */
    function createCampaign(
        string memory _title,
        string memory _description,
        address _owner,
        uint256 _goal,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[campaignsCount];
        require(campaign.deadline < block.timestamp, "Deadline must be set in the future");

        campaign.title = _title;
        campaign.description = _description;
        campaign.owner = _owner;
        campaign.goal = _goal;
        campaign.moneyRaised = 0;
        campaign.deadline = _deadline;
        campaign.image = _image;

        campaignsCount++;
        return campaignsCount - 1;
    }

    /**
     * @dev Allows users to fund a specific campaign by sending ETH.
     * @param _id ID of the campaign to fund.
     */
    function fundCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");
         
        if(sent) {
            campaign.moneyRaised += amount;
        }
    }

    /**
     * @dev Retrieves the list of donators and their respective donations for a campaign.
     * @param _id ID of the campaign.
     * @return Two arrays: one with donator addresses and another with donation amounts.
     */
    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    /**
     * @dev Retrieves all campaigns created in the contract.
     * @return An array of all campaigns.
     */
    function getCampaigns() view public returns (Campaign[] memory){
        Campaign[] memory allCampaigns = new Campaign[](campaignsCount);

        for (uint256 c = 0 ; c < campaignsCount; c++) {
            Campaign storage item = campaigns[c]; 
            allCampaigns[c] = item;
        }
        return allCampaigns;
    }

    /**
     * @dev Retrieves the donation history of a specific user across all campaigns.
     * @param _user Address of the user.
     * @return Two values: an array of donation amounts per campaign and the total donated amount.
     */
    function getUserDonations(address _user) view public returns (uint256[] memory, uint256) {
        uint256[] memory userDonations = new uint256[](campaignsCount);
        uint256 totalDonated = 0;

        for (uint256 c = 0; c < campaignsCount; c++) {
            Campaign storage campaign = campaigns[c];
            for (uint256 d = 0; d < campaign.donators.length; d++) {
                if (campaign.donators[d] == _user) {
                    userDonations[c] += campaign.donations[d];
                    totalDonated += campaign.donations[d];
                }
            }
        }

        return (userDonations, totalDonated);
    }
}