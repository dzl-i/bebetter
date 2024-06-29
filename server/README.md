# Set Up Guides

## Prisma
To create a new migration (save changes made to the schema):
```
npx prisma migrate dev --name <name>
# maybe name it prepending using the number of migration
# e.g. 0_init, 1_add_user, 2_add_post
```

Then, do
```
npx prisma generate
```