const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');
const createTreeData = (arr) => {
  if (!arr.length) {
    return;
  }
  let ul = document.createElement('ul');
  arr.forEach((elem) => {
    let li = document.createElement('li');
    let className = '';
    if (elem.children || elem.children === null) {
      className = 'folder';
    } else {
      className = 'file';
    }
    li.setAttribute('class', `${className}`);
    li.innerHTML = `<span class="${className}">
                      <input type="text" value="${elem.title}" disabled>
                    </span>`;
    ul.appendChild(li);
    if (elem.children) {
      li.appendChild(createTreeData(elem.children));
    }
  });
  return ul;
}
const createTree = (container, arr) => {
  container.appendChild(createTreeData(arr));
}
createTree(rootNode, data);
const rightMenu = '<li id="l1">Rename</li><li id="l2">Delete item<li>';
const ulRoot = document.querySelector('#root>ul');
const ulMenu = document.createElement('ul');
ulMenu.innerHTML = rightMenu;
ulMenu.setAttribute('class', 'rightMenu');
ulRoot.setAttribute('class', 'mainUL');
ulRoot.appendChild(ulMenu);
const allSpan = document.querySelectorAll('span');
allSpan.forEach(element => {
  element.addEventListener('click', (e) => {
    if (e.target.parentNode.querySelector('ul>li') === null && e.target.className !== 'file') {
      const ul = document.createElement('ul');
      ul.innerHTML = '<li><span>Folder is empty</span></li>';
      ul.classList.add('empty');
      e.target.parentNode.appendChild(ul);
    }
    if (e.target.className === 'folder') {
      e.target.classList.add('open');
      e.target.parentNode.classList.add('open');
    } else {
      e.target.classList.remove('open');
      e.target.parentNode.classList.remove('open');
    }
  });
});
const menu = document.querySelector('ul.rightMenu');
rootNode.addEventListener('contextmenu', e => {
  e.preventDefault();
  menu.style.top = `${event.clientY}px`;
  menu.style.left = `${event.clientX}px`;
  menu.classList.add('active');
  if (e.target.className === 'mainUL') {
    menu.classList.remove('enabled');
  }
}, false);
let span = '';
let input = '';
allSpan.forEach(element => {
  element.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    span = e.target;
    if (span.tagName === 'SPAN') {
      allSpan.forEach(span => {
        if (span.className === 'folder stillHover' ||
          span.className === 'folder open stillHover' ||
          span.className === 'file stillHover') {
          if (span.className === 'folder stillHover' ||
            span.className === 'folder open stillHover' ||
            span.className === 'file stillHover') {
            span.classList.remove('stillHover');
            return;
          }
        }
      });
      menu.classList.add('enabled');
      span.classList.add('stillHover');
    } else {
      return;
    }
    input = e.target.querySelector('input');
    document.addEventListener('click', e => {
      if (e.target.textContent === 'Rename') {
        return;
      } else {
        span.classList.remove('stillHover');
        span.classList.remove('active');
        input.setAttribute('disabled', 'disabled');
      }
    }, false);
  });
});
const sortDot = (word) => {
  for (let i = 0; i < word.length; i++) {
    if (word[i] === '.') {
      return i;
    }
  }
}
document.querySelector('#l1').addEventListener('click', () => {
  if (menu.className === 'rightMenu enabled active') {
    span.classList.add('active');
    input.removeAttribute('disabled');
    input.focus();
    if (span.className === 'file stillHover active') {
      input.setSelectionRange(0, sortDot(span.children[0].value));
    } else {
      input.select();
    }
  } else {
    return;
  }
}, false);
document.querySelector('#l2').addEventListener('click', () => {
  if (menu.className !== 'rightMenu enabled active' ||
    menu.className === 'rightMenu active') {
    return;
  } else if (span.className !== 'isEmpty') {
    span.parentNode.remove();
  }
}, false);
const KEYCODEN = 2;
document.addEventListener('click', e => {
  if (e.button !== KEYCODEN) {
    menu.classList.remove('active');
  }
}, false); 