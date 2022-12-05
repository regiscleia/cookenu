export class Recipe {
  constructor(
    private id: string,
    public title: string,
    public description: string,
    private createdAt: Date
  ) {}

  public getId() {
    return this.id;
  }

  public getTitle() {
    return this.title;
  }

  public getDescription() {
    return this.description;
  }

  public getCreatedAt() {
    return this.createdAt;
  }

  static userModelRecipes(data: any): Recipe {
    return new Recipe(data.id, data.title, data.description, data.created_at);
  }
}
