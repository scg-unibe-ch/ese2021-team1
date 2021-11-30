enum PostCategoryEnum {
    Bitcoin = 1,
    Etherum = 2,
    Cardano = 3,
    Polkadot = 4,
}

export class PostCategoryEnumClass {
    public toInteger(category: string): number {
        switch (category) {
            case 'Bitcoin': return PostCategoryEnum.Bitcoin;
            case 'Etherum': return PostCategoryEnum.Etherum;
            case 'Cardano': return PostCategoryEnum.Cardano;
            case 'Polkadot': return PostCategoryEnum.Polkadot;
            default: return 0;
        }
    }

    public toString(category: number): string {
        switch (category) {
            case 1: return 'Bitcoin';
            case 2: return 'Etherum';
            case 3: return 'Cadano';
            case 4: return 'Polkadot';
        }
    }

}
