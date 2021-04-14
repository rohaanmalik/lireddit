import { Migration } from '@mikro-orm/migrations';

export class Migration20210412183439 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_email_check";');
    this.addSql('alter table "user" alter column "email" type text using ("email"::text);');
    this.addSql('alter table "user" alter column "email" set not null;');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);');

    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}
