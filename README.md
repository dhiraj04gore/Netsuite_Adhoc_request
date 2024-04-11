This final contains the code to unset inventory details on the sales order record. This code has been written for a purpose, when you have a serialized item on the sales order record which has a PO connected to it.
The inventory which is received via the PO is automatically committed to the sales order and can be seen at line level in the field called "inventory detail".
The icon is marked as checked. This means that the serial numbers are committed, this causes an issue, you cannot see the fulfil button on the sales order. To resolve this issue, you need to un-check the inventory detail and 
re-allocate the item to the same sales order by.

This problem has been solved by the code.
