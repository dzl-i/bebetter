# Set Up Guides

## Prisma
To create a new migration (save changes made to the schema):
```
npx prisma migrate dev --name <name>
# maybe name it prepending using the number of migration... or not idk up to u 😁👍
# e.g. 0_init, 1_deez, 2_nuts
```

Then, do
```
npx prisma generate
```