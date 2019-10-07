## Basic Queries

==> https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top


[ ] find all customers with postal code 1010. Returns 3 records.

```sql
SELECT * FROM [Customers] 
where PostalCode = '1010';
```

[ ] find the phone number for the supplier with the id 11. Should be (010) 9984510.

```sql
SELECT Phone FROM [Suppliers]
where SupplierID = '11'
```

[ ] list first 10 orders placed, sorted descending by the order date. The order with date 1997-02-12 should be at the top.

```sql
SELECT * FROM [Orders]
order by OrderDate desc
limit 10
```

[ ] find all customers that live in London, Madrid, or Brazil. Returns 18 records.

```sql
SELECT * FROM [Customers]
where Country = 'Brazil' or City in ('London', 'Madrid');
```

[ ] add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is "1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth".

```sql
insert into customers (CustomerName, ContactName, Address, City, PostalCode, Country)
values ('The Shire', 'Bilbo Baggins', '1 Hobbit-Hole', 'Bag End', '111', 'Middle Earth')
```

[ ] update Bilbo Baggins record so that the postal code changes to "11122".

```sql
update Customers set PostalCode = '11122'
where CustomerID = 92
```