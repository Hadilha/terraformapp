// src/app/folder-tree/folder-tree.ts
import { Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

export interface FolderNode {
  name?: string;
  files?: string[];
  folders?: FolderNode[];
  contents?: { files?: string[]; folders?: FolderNode[] };
  __open?: boolean;
}

@Component({
  selector: 'app-folder-tree',
  standalone: true,
  templateUrl: './folder-tree.html',
  styleUrls: ['./folder-tree.css'],
  imports: [NgIf, NgFor, FolderTreeComponent] // <-- self-import for recursion
})
export class FolderTreeComponent {
  @Input() root: FolderNode | null = null;

  toggle(node: FolderNode) {
    node.__open = !node.__open;
  }
}
