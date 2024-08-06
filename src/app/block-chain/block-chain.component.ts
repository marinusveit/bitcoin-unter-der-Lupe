import { Component } from '@angular/core';
import { BlockTemplateComponent } from '../block-template/block-template.component';

@Component({
  selector: 'app-block-chain',
  standalone: true,
  imports: [BlockTemplateComponent],
  templateUrl: './block-chain.component.html',
  styleUrl: './block-chain.component.scss'
})
export class BlockChainComponent {

}
