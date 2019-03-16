pragma solidity >=0.4.21 <0.6.0;

contract TraigoFacturas {
    mapping (uint => Entry) public entries;

    struct Entry {
        uint date;
        bool open;
    }

    uint public index;

    event NewEntry();

    constructor () public {
        index = 0;
    }

    function newEntry () public {
        Entry storage entry = entries[index];
        entry.date = now;
        entry.open = true;

        index = index + 1;
        emit NewEntry();
    }
}
