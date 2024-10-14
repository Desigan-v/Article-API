import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'articles',
  timestamps: true,
})
export class Article extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  authorName!: string;

  @Column
  article!: string;

  @Column
  description!: string;

  @Column
  articleFile!: string;  // To store the file path of the uploaded article
}
