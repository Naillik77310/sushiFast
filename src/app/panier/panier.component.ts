import { ManagerSushiBoxService } from '../service/manager-sushi-box.service';
import { IBox } from 'src/model/IBox';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: [],
})
export class PanierComponent implements OnInit {
  @ViewChild('searchInput', { static: true }) searchInput?: ElementRef;

  panier: IBox[] = [];
  uniqueCart: IBox[] = [];
  total: number = 0;
  imageLink: string = environment.pathImage;

  constructor(
    private boxService: ManagerSushiBoxService,
    public dialog: MatDialog
  ) {}

  // Ouvre le dialogue de confirmation pour valider la commande
  openConfirmationDialog() {
    if (this.panier.length === 0) {
      // Si le panier est vide, afficher un message d'erreur
      alert('Votre panier est vide, vous ne pouvez pas passer de commande.');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.savePanierToLocalStorage();
        this.boxService.clearPanier(); // Vide le panier
        this.panier = []; // Met à jour la variable `panier` dans le composant
        this.uniqueCart = []; // Met à jour la variable `uniqueCart` dans le composant
        this.total = 0; // Réinitialise le total
      }
    });
  }

  // Initialise le composant, récupère le panier et calcule le total
  ngOnInit() {
    this.panier = this.boxService.panier; // Récupère le panier du service
    this.uniqueCart = this.getRegroupedBox(); // Regroupe les éléments du panier
    this.calculateTotal(); // Calcule le total du panier
  }

  // Calcule le total du panier
  calculateTotal() {
    this.total = 0;
    for (let box of this.panier) {
      this.total += box.prix; // Ajoute le prix de chaque box au total
    }
    this.total = parseFloat(this.total.toFixed(2)); // Arrondit le total à deux décimales
  }

  // Regroupe les éléments du panier en fonction de leur ID
  getRegroupedBox(): IBox[] {
    return this.panier.filter(
      (value, index, array) =>
        array.findIndex((find) => find.id === value.id) === index // Filtrer les éléments uniques par ID
    );
  }

  // Compte le nombre d'occurrences d'une box spécifique dans le panier
  countOccurrences(box: IBox): number {
    return this.panier.reduce((nbBox, occBox) => {
      if (occBox.id === box.id) {
        // Si l'ID de la box actuelle correspond à l'ID recherché
        return nbBox + 1; // Incrémente le compteur
      }
      return nbBox; // Sinon, retourne la valeur actuelle du compteur
    }, 0);
  }

  // Supprime une box du panier en fonction de son ID
  removeFromPanier(id: number) {
    this.boxService.deleteCountPanier();
    const index = this.panier.findIndex((box) => box.id === id); // Trouve l'index de la box avec l'ID spécifié
    if (index > -1) {
      this.panier.splice(index, 1); // Supprime la box de l'index trouvé
      this.calculateTotal(); // Recalcule le total
    }
    // Vérifie si le nombre d'occurrences est 0 après la suppression
    const box = this.uniqueCart.find((b) => b.id === id); // Trouve la box avec l'ID spécifié
    if (box && this.countOccurrences(box) === 0) {
      this.uniqueCart = this.uniqueCart.filter((b) => b.id !== id); // Supprime la box si le nombre d'occurrences est 0
    }
  }

  // Ajoute une box au panier
  addToPanier(box: IBox) {
    this.boxService.ajouterCountPanier();
    this.panier.push(box); // Ajoute la box à la liste du panier
    this.uniqueCart = this.getRegroupedBox(); // Met à jour la liste des boxes uniques
    this.calculateTotal(); // Recalcule le total
  }
  generateUniqueId() {
    return new Date().getTime().toString();
  }

  // Sauvegarde le panier dans le localStorage
  savePanierToLocalStorage() {
    //this.boxService.cleanCountPanier()
    // Récupérer les commandes existantes du localStorage
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');

    if (this.panier.length > 0) {
      // Créer un nouvel objet de commande avec un identifiant unique et le contenu du panier
      let newOrder = {
        id: this.generateUniqueId(),
        cart: this.panier,
      };
      console.log(this.generateUniqueId());

      // Ajouter la nouvelle commande au tableau des commandes
      orders.push(newOrder);
    }
    // Sauvegarder le tableau des commandes mis à jour dans le localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
  }
}