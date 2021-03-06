import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SSHKeyPair } from '../shared/models/ssh-keypair.model';


@Component({
  selector: 'cs-ssh-key-list-item',
  templateUrl: 'ssh-key-list-item.component.html',
  styleUrls: ['ssh-key-list-item.component.scss']
})
export class SshKeyListItemComponent {
  @Input() public key: SSHKeyPair;
  @Output() public onRemove = new EventEmitter<string>();

  public onRemoveClicked(): void {
    this.onRemove.emit(this.key.name);
  }
}
