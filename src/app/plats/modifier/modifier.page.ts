import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatsService } from 'src/app/service/plats.service';
import { Plat } from 'src/app/Models/plat';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.page.html',
  styleUrls: ['./modifier.page.scss'],
})
export class ModifierPage implements OnInit {

  nomControl: FormControl;
  prixControl: FormControl;
  descriptionControl: FormControl;
  formGroup: FormGroup;
  platId: number;
  plat: Plat;
  constructor(private builder: FormBuilder, private route: ActivatedRoute,
    private nav : NavController, private service: PlatsService, private router : Router) {
    this.platId = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getPlat(this.platId).subscribe(plat => {
      this.plat = plat;
      this.nomControl = new FormControl(this.plat.nom, [Validators.required, Validators.minLength(2)]);
      this.prixControl = new FormControl(this.plat.prix, Validators.required);
      this.descriptionControl = new FormControl(this.plat.description);
      this.formGroup = this.builder.group({
        nom: this.nomControl,
        prix: this.prixControl,
        description: this.descriptionControl
      })
    })

  }

  modifier(): void {
    this.service.updatePlat(this.plat.id, this.formGroup.value).subscribe(plat=> {
      this.nav.back();
    })
  }

  ngOnInit() {
  }

}
