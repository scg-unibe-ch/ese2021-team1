import {ProfilPageComponent} from "./profil-page.component";
import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";

describe('Profile Page Components', () => {
  let profilPageComponent: ProfilPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProfilPageComponent]
    });

    profilPageComponent = TestBed.get(ProfilPageComponent);
  });

  it('should be created', () => {
    expect(profilPageComponent).toBeTruthy();
  });
});
