import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
            isLeaf: true
          }
        ]
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        isLeaf: true
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            isLeaf: true
          }
        ]
      }
    ]
  }
];

const otherOptions = [
  {
    value: 'fujian',
    label: 'Fujian',
    children: [
      {
        value: 'xiamen',
        label: 'Xiamen',
        children: [
          {
            value: 'Kulangsu',
            label: 'Kulangsu',
            isLeaf: true
          }
        ]
      }
    ]
  },
  {
    value: 'guangxi',
    label: 'Guangxi',
    children: [
      {
        value: 'guilin',
        label: 'Guilin',
        children: [
          {
            value: 'Lijiang',
            label: 'Li Jiang River',
            isLeaf: true
          }
        ]
      }
    ]
  }
];

@Component({
  selector: 'test.container',
  host: {
    '[style.position]': "'absolute'",
  },
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit, OnDestroy {
  nzOptions: any[] | null = null;
  values: any[] | null = null;
  person = { id: 1, name: 'AngoWang' };
  isSelected: boolean = false;
  isMouseDowned: boolean = false;
  diffX: number = 0;
  diffY: number = 0;
  disX: number = 0;
  disY: number = 0;

  constructor(private _elementRef: ElementRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.nzOptions = options;
    }, 100);
  }

  ngOnDestroy(): void {
  }

  changeNzOptions(): void {
    if (this.nzOptions === options) {
      this.nzOptions = otherOptions;
    } else {
      this.nzOptions = options;
    }
  }

  onChanges(values: any): void {
    console.log(this.values);
  }

  onNotify(data) {
    alert(data.name);
  }

  onSelect() {
    if (!this.isSelected) {
      this.isSelected = true;
    }
  }

  @HostListener('document:mouseup', ['$event.target'])
  onClick(targetElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isSelected = false;
    }
  }

  onMouseDown(event) {
    const that = this;

    that.isMouseDowned = true;
    that.diffX = event.clientX - that._elementRef.nativeElement.offsetLeft;
    that.diffY = event.clientY - that._elementRef.nativeElement.offsetTop;
    
    document.onmousemove = function(e) {
      let moveX = e.clientX - that.diffX;
      let moveY = e.clientY - that.diffY;
      if (moveX < 0) {
        moveX = 0;
      } else if (moveX > window.innerWidth - that._elementRef.nativeElement.offsetWidth) {
        moveX = window.innerWidth - that._elementRef.nativeElement.offsetWidth;
      }
      if (moveY < 0) {
        moveY = 0;
      } else if (moveY > window.innerHeight - that._elementRef.nativeElement.offsetHeight) {
        moveY = window.innerHeight - that._elementRef.nativeElement.offsetHeight;
      }
      that._elementRef.nativeElement.style.left = moveX + 'px';
      that._elementRef.nativeElement.style.top = moveY + 'px';
    };

    document.onmouseup = function(e) {
      that.isMouseDowned = false;
      document.onmousemove = document.onmouseup = null;
    };
  }

  resizeTopLeft(event) {
    const that = this;

    that.disY = event.clientY;
    that.disX = event.clientX;

    document.onmousemove = function(e) {
      that._elementRef.nativeElement.style.height = that._elementRef.nativeElement.offsetHeight - (e.clientY - that.disY) + 'px';
			that._elementRef.nativeElement.style.top = that._elementRef.nativeElement.offsetTop + (e.clientY - that.disY) + 'px';
      that._elementRef.nativeElement.style.width = that._elementRef.nativeElement.offsetWidth - (e.clientX - that.disX) + 'px';
			that._elementRef.nativeElement.style.left = that._elementRef.nativeElement.offsetLeft + (e.clientX - that.disX) + 'px';
      that.disY = e.clientY;
      that.disX = e.clientX;
    };

    document.onmouseup = function(e) {
      document.onmousemove = document.onmouseup = null;
    };
  }

  resizeTopMiddle(event) {
    const that = this;

    that.disY = event.clientY;

    document.onmousemove = function(e) {
      that._elementRef.nativeElement.style.height = that._elementRef.nativeElement.offsetHeight - (e.clientY - that.disY) + 'px';
			that._elementRef.nativeElement.style.top = that._elementRef.nativeElement.offsetTop + (e.clientY - that.disY) + 'px';
      that.disY = e.clientY;
    };

    document.onmouseup = function(e) {
      document.onmousemove = document.onmouseup = null;
    };
  }

  resizeTopRight(event) {
    const that = this;

    that.disY = event.clientY;
    that.disX = event.clientX;

    document.onmousemove = function(e) {
      that._elementRef.nativeElement.style.height = that._elementRef.nativeElement.offsetHeight - (e.clientY - that.disY) + 'px';
			that._elementRef.nativeElement.style.top = that._elementRef.nativeElement.offsetTop + (e.clientY - that.disY) + 'px';
      that._elementRef.nativeElement.style.width = that._elementRef.nativeElement.offsetWidth + (e.clientX - that.disX) + 'px';
      that.disY = e.clientY;
      that.disX = e.clientX;
    };

    document.onmouseup = function(e) {
      document.onmousemove = document.onmouseup = null;
    };
  }

  resizeMiddleLeft(event) {
    const that = this;

    that.disX = event.clientX;

    document.onmousemove = function(e) {
      that._elementRef.nativeElement.style.width = that._elementRef.nativeElement.offsetWidth - (e.clientX - that.disX) + 'px';
			that._elementRef.nativeElement.style.left = that._elementRef.nativeElement.offsetLeft + (e.clientX - that.disX) + 'px';
      that.disX = e.clientX;
    };

    document.onmouseup = function(e) {
      document.onmousemove = document.onmouseup = null;
    };
  }

  resizeMiddleRight(event) {
    const that = this;

    that.disX = event.clientX;

    document.onmousemove = function(e) {
      that._elementRef.nativeElement.style.width = that._elementRef.nativeElement.offsetWidth + (e.clientX - that.disX) + 'px';
      that.disX = e.clientX;
    };

    document.onmouseup = function(e) {
      document.onmousemove = document.onmouseup = null;
    };
  }

  resizeBottomLeft(event) {
    const that = this;

    that.disY = event.clientY;
    that.disX = event.clientX;

    document.onmousemove = function(e) {
      that._elementRef.nativeElement.style.height = that._elementRef.nativeElement.offsetHeight + (e.clientY - that.disY) + 'px';
      that._elementRef.nativeElement.style.width = that._elementRef.nativeElement.offsetWidth - (e.clientX - that.disX) + 'px';
      that._elementRef.nativeElement.style.left = that._elementRef.nativeElement.offsetLeft + (e.clientX - that.disX) + 'px';
      that.disY = e.clientY;
      that.disX = e.clientX;
    };

    document.onmouseup = function(e) {
      document.onmousemove = document.onmouseup = null;
    };
  }

  resizeBottomMiddle(event) {
    const that = this;

    that.disY = event.clientY;

    document.onmousemove = function(e) {
      that._elementRef.nativeElement.style.height = that._elementRef.nativeElement.offsetHeight + (e.clientY - that.disY) + 'px';
      that.disY = e.clientY;
    };

    document.onmouseup = function(e) {
      document.onmousemove = document.onmouseup = null;
    };
  }

  resizeBottomRight(event) {
    const that = this;

    that.disY = event.clientY;
    that.disX = event.clientX;

    document.onmousemove = function(e) {
      that._elementRef.nativeElement.style.height = that._elementRef.nativeElement.offsetHeight + (e.clientY - that.disY) + 'px';
      that._elementRef.nativeElement.style.width = that._elementRef.nativeElement.offsetWidth + (e.clientX - that.disX) + 'px';
      that.disY = e.clientY;
      that.disX = e.clientX;
    };

    document.onmouseup = function(e) {
      document.onmousemove = document.onmouseup = null;
    };
  }
}
