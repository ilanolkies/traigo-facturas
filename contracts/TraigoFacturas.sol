pragma solidity >=0.4.21 <0.6.0;

contract TraigoFacturas {
    mapping (uint => Entry) public entries;

    struct Entry {
        uint date;
        bool open;
    }

    uint public index;

    event NewEntry();
    event CloseEntry(uint index);

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

    function closeEntry (uint _index) public {
        Entry storage entry = entries[_index];
        entry.open = false;

        emit CloseEntry(_index);
    }
}
