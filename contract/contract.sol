// Contract to facilitate buying and selling of PC parts
pragma solidity ^0.8.0;

contract PCPartsMarketplace {
    // Define struct for PC part
    struct Part {
        uint256 id;
        string name;
        uint256 price;
        uint256 quantity;
        address seller;
    }

    struct PartPurchase {
    uint partId;
    uint quantity;
    uint timestamp;
}


    // Define variables
    mapping(uint256 => Part) public parts;
    uint256 public partsCount;

    // Define events
    event NewPartAdded(uint256 id, string name, uint256 price, uint256 quantity, address seller);
    event PartPurchased(uint256 id, string name, uint256 price, uint256 quantity, address seller, address buyer);

    // Add a new PC part to the marketplace
    function addPart(string memory _name, uint256 _price, uint256 _quantity) public {
        // Increment parts count
        partsCount++;

        // Create new part and add to parts mapping
        parts[partsCount] = Part(partsCount, _name, _price, _quantity, msg.sender);

        // Emit event
        emit NewPartAdded(partsCount, _name, _price, _quantity, msg.sender);
    }

    // Purchase a PC part from the marketplace
    function purchasePart(uint256 _id, uint256 _quantity) public payable {
        // Check that part exists
        require(_id > 0 && _id <= partsCount, "Invalid part ID");

        // Get the part
        Part storage part = parts[_id];

        // Check that there is enough quantity available
        require(part.quantity >= _quantity, "Insufficient quantity available");

        // Calculate total price
        uint256 totalPrice = part.price * _quantity;

        // Check that buyer has sent enough ether
        require(msg.value >= totalPrice, "Insufficient ether sent");

        // Transfer ether to seller
        payable(part.seller).transfer(totalPrice);

        // Update part quantity
        part.quantity -= _quantity;

        // Emit event
        emit PartPurchased(_id, part.name, part.price, _quantity, part.seller, msg.sender);
    }

    function getPurchaseHistory(address buyer) public view returns (PartPurchase[] memory) {
        uint purchaseCount = purchases[buyer].length;
        PartPurchase[] memory history = new PartPurchase[](purchaseCount);
        for (uint i = 0; i < purchaseCount; i++) {
            PartPurchase memory purchase = purchases[buyer][i];
            history[i] = purchase;
        }
        return history;
    }

}
