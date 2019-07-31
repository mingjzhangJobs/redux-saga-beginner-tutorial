let newName = "",
  menustr = "",
  menuArr = [],
  selectkey = "";

/**
 * 用于点击一级菜单的时候找到子菜单的第一个url
 * @param {*} data 菜单数据
 */
function menuUrl(data) {
  if (data.children != undefined && data.children.length > 0) {
    for (let index = 0; index < data.children.length; index++) {
      const element = data.children[index];

      if (element.url === "") {
        return menuUrl(element);
      } else {
        return element;
      }
    }
  }
}

/**
 * 获取选中的菜单的key
 * @param {*} data
 * @param {*} selectke
 */
export function OpenKeys(data, selectke) {
  if (data === null) return null;
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element.id == selectke) {
      selectkey = element.parent;
    }
    OpenKeys(element.children, selectke);
  }
  return selectkey;
}

/**
 * 默认全部展开左边菜单
 * @param {*} data 菜单数据
 * @param {*} name 当前选择一级菜单名称
 */
export function MenuKey(data, name) {
  if (data === null) return null;
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element.menuName === name) {
      for (let index2 = 0; index2 < element.children.length; index2++) {
        const element2 = element.children[index2];
        menuArr[menuArr.length] = element2.id;
      }
    }
  }
  return menuArr;
}

/**
 * 根据url获取默认展开的key
 * @param {object} data 菜单数据
 * @param {string} url 当前url
 */
export function getMenuKey(data, name, url) {
  if (data === null) return null;
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element.menuName === url) {
      for (let index2 = 0; index2 < element.children.length; index2++) {
        const element2 = element.children[index2];
        menuArr[menuArr.length] = element2.id;
      }
    }
  }
  return menuArr;
}

/**
 * 通过name获取名称是否在列表中
 * @param {*} data 菜单数据
 * @param {*} name 当前的名称
 */
var nameAddList = function(data, name) {
  if (data === null) return null;
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element.menuName === name) {
      return true;
    } else {
      nameAddList(element.children, name);
    }
  }
  return false;
};;

/**
 * 通过url获取菜单名称，用户展示左边菜单
 * @param {*} data 菜单数据
 * @param {*} url 当前用户访问的url
 */
export function hoverName(data, url) {
  if (data === null) return null;
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element.url.indexOf(url) != -1) {
      newName = element.parentName;
    } else {
      if (element.children.length > 0) {
        hoverName(element.children, url);
      }
    }
  }
  return newName;
}
function dataUrl(urlName){
  if(urlName!=null && urlName.indexOf("http")!=-1){
    return urlName.substring(urlName.indexOf('/fuse/'),urlName.length);
  }
  return urlName;
}
/**
 * 递归菜单，拼接菜单结构
 * @param {*} data 返回的菜单数据
 * @param {*} id 菜单ID
 * @param {*} name 菜单名称
 */
function menuItem(data, id, name) {
  let arrs = [];
  data.map(function(e, i) {
   
    if (e.parent === id) {
      arrs.push({
        id: e.id,
        url: e.url,
        nw: e.nw,
        parent: e.parent,
        parentName: name,
        menuName: e.menuName,
        children: menuItem(data, e.id, name)
      });
    }
  });
  return arrs;
}

/**
 * 处理菜单数据
 * @param {*} data 菜单接口返回数据
 */
export function menu(data) {
  if (data === null) return null;
  let arrs = [];

  data.map(function(e, i) {
    if (e.parent === "EDAOJZ" && e.id.indexOf("EDAOJZ") != -1) {
      arrs.push({
        id: e.id,
        url: e.url,
        nw: e.nw,
        parentName: e.menuName,
        parent: e.parent,
        menuName: e.menuName,
        children: menuItem(data, e.id, e.menuName)
      });
    }
  });
  for (let k1 = 0; k1 < arrs.length; k1++) {
    const ens = arrs[k1];
    if (ens.url === "" && ens.children.length > 0) {
      ens.newurl = menuUrl(ens).url;
    } else {
      ens.newurl = ens.url;
    }
  }

  return arrs;
}

