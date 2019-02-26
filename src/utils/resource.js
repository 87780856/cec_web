//// 资源描述对象
// {
//   uri: xxx,                // 必填 对象唯一id
//   selected: false,         // 可选 是否被选择，默认为未选择false
//   difference: null         // 可选 修改状态下的改变差异，该资源被改变该值会设置相应差异,默认为null 可选值 'row_added','row_removed','row_modified'
//   parentUri: {             // 可选 默认为null
//     fieldName: 'xxx',      // （树）父节点属性，xxx为父节点的uri必填非空
//     editValue: '',         // （树）父节点值，
//   }
//   childrenObj: [{xxx},],   // 可选 （树）子节点，xxx为子节点对象
//   disabled: false,         // 可选 （树）节点是否被禁用，true为禁用
//   expanded: false,         // 可选 （树）节点是否被展开，true为展开
//   props: [
//		{
//       fieldName: '',       // 必填 业务对象属性非空
//       editValue: null,     // 可选 默认为null				最新编辑角色数据
// 			 comparison: 'exact'	// 可选 默认为exact			查询操作符，具体参照django的Fields的lookup分词
//       displayValue: null,  // 可选 默认为编辑角色数据	显示角色数据
//       oldEditValue: null,  // 可选 默认为编辑角色数据	单元格未保存时的旧编辑角色数据
//       editable: false,     // 可选 默认为false			单元格可编辑
//       editing: false,      // 可选 默认为false			单元格正在编辑
//     },
//     //...
//   ],
// },

import _ from 'lodash'

function uuid() {
  const uuidv4 = require('uuid/v4')
  return uuidv4()
}
//////////////////////////////////////////////////////////////////////////////
// 属性
//////////////////////////////////////////////////////////////////////////////
/**
 * 生成属性
 * @param {Object} prop 属性对象
 */
export function generateProperty(prop) {
  var retval = null
  if (prop) {
    let tempDisplayValue = null
    if (prop.displayValue) {
      // 注意显示值需要转换
      tempDisplayValue = prop.displayValue
    } else {
      if (prop.editValue) {
        tempDisplayValue = prop.editValue
      }
    }
    let tempOldEditValue = null
    if (prop.oldEditValue) {
      tempOldEditValue = prop.oldEditValue
    } else {
      if (prop.editValue) {
        tempOldEditValue = prop.editValue
      }
    }

    retval = {
      fieldName: prop.fieldName,
      editValue: prop.editValue ? prop.editValue : null,
      comparison: prop.comparison ? prop.comparison : 'exact',
      displayValue: tempDisplayValue,
      oldEditValue: tempOldEditValue,
      editable: prop.editable ? prop.editable : false,
      editing: prop.editing ? editing : false,
    }
  } else {
    retval = {
      fieldName: null,
      editValue: null,
      comparison: 'exact',
      displayValue: null,
      oldEditValue: null,
      editable: false,
      editing: false,
    }
  }
  return retval
}

/**
 * 生成属性2
 * @param {String} fieldName 属性名
 * @param {String} editValue 属性值
 * @param {String} comparison 比较符
 * @param {String} displayValue 显示值
 * @param {String} oldEditValue 旧显示值
 * @param {Boolean} editable 可编辑状态
 * @param {Boolean} editing 正在编辑状态
 */
export function generateProperty2(
  fieldName,
  editValue,
  comparison,
  displayValue,
  oldEditValue,
  editable,
  editing,
) {
  return generateProperty({
    fieldName,
    editValue,
    comparison,
    displayValue,
    oldEditValue,
    editable,
    editing,
  })
}

/**
 * 查找属性
 * 如果没找到返回undefined，找到了返回属性对象
 * @param {Array} props 属性对象序列
 * @param {String} fieldName 属性名
 */
export function findProperty(props, fieldName) {
  if (!props) {
    return undefined
  } else {
    return props.find(element => {
      return element.fieldName === fieldName
    })
  }
}

/**
 * 增加属性
 * 将props中追加一个prop属性
 * @param {Array} props 属性列表
 * @param {Object} prop 要追加的属性对象
 */
export function addProperty(props, prop) {
  if (!props || !prop) {
    return
  }
  props.push(generateProperty(prop))
}

/**
 * 赋值属性
 * 将源prop对象写入到props中的第index元素中
 * @param {Array} props 属性序列
 * @param {Integer} index 属性序列的索引从0开始
 * @param {Object} prop 源赋值属性
 */
export function setProperty(props, index, prop) {
  if (!props || !props[index]) {
    return
  }
  Object.keys(props[index]).forEach(element => {
    if (prop[element]) {
      props[index][element] = prop[element]
    }
  })
}
//////////////////////////////////////////////////////////////////////////////
// 属性序列
//////////////////////////////////////////////////////////////////////////////
/**
 * 生成属性序列
 * @param {Array} props 属性对象序列
 */
export function generateProperties(props) {
  if (!props) {
    return null
  }

  var retval = []
  props.forEach(element => {
    retval.push(generateProperty(element))
  })
  return retval
}
//////////////////////////////////////////////////////////////////////////////
// 资源
//////////////////////////////////////////////////////////////////////////////
/**
 * 生成资源
 * @param {Array} props 属性对象序列
 * @param {String} uri 资源uri，传入uri为空，则自动分配一个,uri不允许为空且唯一。
 */
export function generateResource(props, uri) {
  var retval = {
    uri: uri ? uri : uuid(),
    props: props ? generateProperties(props) : [],
    selected: false,
    difference: null,
    parentUri: null,
    childrenObj: [],
    disabled: false,
    expanded: false,
  }
  return retval
}

/**
 * 设置rd资源的editing状态
 * @param {Object} rd 资源对象
 * @param {Boolean} editingFlag 正在编辑状态，true为正在编辑
 */
export function setResourceEditingState(rd, editingFlag) {
  if (!rd || !rd.props) {
    return
  }
  rd.props.forEach(prop => {
    if (prop.editable) {
      prop.editing = editingFlag
    }
  })
}

/**
 * 赋值资源属性
 * 参数：将targetProps对象写入到rd资源属性中,要求rd资源属性与targetProps，顺序相同
 */
/**
 * 赋值资源属性列表
 *
 * @param {Object} rd
 * @param {Array} props
 */
export function setResourceProperties(rd, props) {
  if (!rd || !rd.props || !props) {
    return
  }

  props.forEach((element, index) => {
    setProperty(rd.props, index, element)
  })
}

/**
 * 修改一个资源中第index的属性,当前资源差异状态改为修改状态
 * @param {Object} rd 资源对象
 * @param {Integer} index 属性索引
 * @param {Object} prop 属性对象
 */
export function modifyResourceProperty(rd, index, prop) {
  if (!rd) {
    return
  }
  setProperty(rd.prop, index, prop)
  if (rd.difference !== 'row_added' && rd.difference !== 'row_removed') {
    rd.difference = 'row_modified'
  }
}

//////////////////////////////////////////////////////////////////////////////
// 资源序列查询
//////////////////////////////////////////////////////////////////////////////
/**
 * 查找资源，如果没找到返回undefined
 * @param {Array} rds
 * @param {String} uri
 * @returns {Object} 如果没找到返回undefined，找到返回rd对象
 */
export function findResources(rds, uri) {
  if (!rds || !uri) {
    return undefined
  } else {
    return rds.find(element => {
      return element.uri === uri
    })
  }
}

/**
 * 是否存在被选择的资源
 * @param {Array} rds
 * @returns {Boolean} 是为true 否为false
 */
export function hasResourcesSelected(rds) {
  if (!rds) {
    return false
  }

  return rds.find(rd => {
    return rd.selected === true
  })
}

/**
 * 获得rd资源的差异状态
 * @param {Object} rd 资源
 * @returns {String} 增加返回'ROW_ADDED',删除返回'ROW_REMOVED'，修改返回'ROW_MODIFIED'，其它返回null
 */
export function getResourceDifferenceState(rd) {
  if (!rd) {
    return null
  }
  if (rd.difference === 'row_added') {
    return 'ROW_ADDED'
  } else if (rd.difference === 'row_removed') {
    return 'ROW_REMOVED'
  } else if (rd.difference === 'row_modified') {
    return 'ROW_MODIFIED'
  } else {
    return null
  }
}

/**
 * 获取资源描述差异模型
 * @param {Array} rds 资源列表
 * @returns {Object} 返回差异模型,对象结构如下:
 *  {
 *    inserted: [],
 *    updated: [],
 *    removed: [],
 *  }
 */
export function getDifferenceModel(rds) {
  if (!rds) {
    return null
  }

  let diffModel = {
    inserted: [],
    updated: [],
    removed: [],
  }
  rds.forEach(rd => {
    if (rd.difference === 'row_added') {
      let tempRd = {}
      rd.props.forEach(prop => {
        if (prop.fieldName !== 'pk') {
          tempRd[prop.fieldName] = prop.editValue
        }
      })
      // 如果有父节点的话，增加父的外键
      if (rd.parentUri) {
        tempRd[rd.parentUri.fieldName] = rd.parentUri.editValue
      }

      diffModel.inserted.push(tempRd)
    } else if (rd.difference === 'row_modified') {
      let tempRd = {}
      rd.props.forEach(prop => {
        if (prop.fieldName !== 'pk' && prop.editValue !== prop.oldEditValue) {
          tempRd[prop.fieldName] = prop.editValue
        }
      })
      if (Object.keys(tempRd).length !== 0) {
        tempRd['pk'] = rd.uri
        diffModel.updated.push(tempRd)
      }
    } else if (rd.difference === 'row_removed') {
      diffModel.removed.push(rd.uri)
    }
  })

  if (
    diffModel.inserted.length === 0 &&
    diffModel.updated.length === 0 &&
    diffModel.removed.length === 0
  ) {
    diffModel = null
  }
  return diffModel
}

//////////////////////////////////////////////////////////////////////////////
// 资源序列修改
//////////////////////////////////////////////////////////////////////////////
/**
 * 增加一个资源到资源序列，当前资源差异状态改为增加状态
 * 将rd加入到rds中，如果rds为空则
 * @param {Array} rds 源资源列表，可以为null,则只调整rd的增加状态。
 * @param {Object} rd 要增加的资源
 */
export function appendResources(rds, rd) {
  if (!rd) {
    return
  }
  rd.difference = 'row_added'
  if (rds) {
    rds.push(rd)
  }
}

/**
 * 删除多个资源，这些资源差异状态改为删除状态
 * @param {Array} rds 要删除的资源列表
 */
export function removeResources(rds) {
  if (!rds) {
    return
  }
  var indexes = [] // 已经插入未保存的资源索引
  rds.forEach((rd, index) => {
    if (rd.selected) {
      if (rd.difference === 'row_added') {
        indexes.push(index)
      }
      rd.difference = 'row_removed'
    }
  })

  indexes.forEach(element => {
    rds.splice(element, 1)
  })
}

/**
 * 更新资源，将资源差异状态调整为未改变状态null
 * @param {Array} rds 资源列表
 * @param {Array} addedRecords 被插入行列表,其格式为
 *  [
 *    {
 *      pk:'xxx',   // 必须有
 *      ...         // 其它
 *    },
 *    ...
 *  ]
 */
export function saveResources(rds, addedRecords) {
  var insertedIndex = 0
  var removingIndexList = []
  rds.forEach((rd, index) => {
    // 插入
    if (rd.difference === 'row_added') {
      rd.uri = addedRecords[insertedIndex].pk
      ++insertedIndex
      rd.difference = null
    }
    // 更新
    else if (rd.difference === 'row_modified') {
      rd.props.forEach(prop => {
        prop.oldEditValue = prop.editValue
      })
      rd.difference = null
    } else if (rd.difference === 'row_removed') {
      removingIndexList.push(index)
    }
  })
  // 删除资源
  for (var i = removingIndexList.length - 1; i >= 0; i--) {
    rds.splice(removingIndexList[i], 1)
  }
}

/**
 * 设置资源序列的selected状态
 * @param {Array} sourceRds 源资源列表
 * @param {Array} selectedRds 已选择的资源列表
 */
export function setResourcesSelectedState(sourceRds, selectedRds) {
  if (!sourceRds) {
    return
  }

  // 非选定资源
  var notSelectedRds = _.differenceWith(sourceRds, selectedRds, _.isEqual)
  if (notSelectedRds) {
    notSelectedRds.forEach(rd => {
      rd.selected = false
    })
  }
  // 选定资源
  if (selectedRds) {
    selectedRds.forEach(rd => {
      rd.selected = true
    })
  }
}

/**
 * 设置所有资源editing状态
 * @param {*} rds 资源列表
 * @param {*} editingFlag 正在编辑状态，true为正在编辑
 */
export function setResourcesEditingState(rds, editingFlag) {
  if (!rds) {
    return
  }
  rds.forEach(rd => {
    setResourceEditingState(rd, editingFlag)
  })
}

//////////////////////////////////////////////////////////////////////////////
// 未整理
//////////////////////////////////////////////////////////////////////////////

/**
 * 将api返回json数据转换成资源
 * props:要转换的资源属性，格式如[{fieldName:'xxx'},{fieldName:'xxx'}]
 * records:为转换前的数据，格式如[{code:'xxx',name:'xxx'},{code:'xxx',name:'xxx'}]
 * parentFieldName:父属性
 */
export function setResources(records, props, parentFieldName) {
  if (!records) return
  let res = []
  records.forEach(element => {
    res.push(setResource(element, props, parentFieldName))
  })
  return res
}

/**
 * 将api返回json数据转换成资源如[{code:'xxx',name:'xxx'}]
 * props:要转换的资源属性，格式如[{fieldName:'xxx'},{fieldName:'xxx'}]
 * record:为转换前的数据，格式如[{code:'xxx',name:'xxx'},{code:'xxx',name:'xxx'}]
 * parentFieldName:父属性
 */
export function setResource(record, props, parentFieldName) {
  var tempProps = []

  var parentUri = null
  props.forEach(prop => {
    // 查找record列是否存在
    let fieldName = Object.keys(record).find(element => {
      return element === prop.fieldName
    })
    // 如果存在则设置属性的值
    if (fieldName) {
      tempProps.push(
        generateProperty2(
          fieldName,
          record[fieldName],
          prop.comparison,
          prop.displayValue,
          prop.oldEditValue,
          prop.editable,
          prop.editing,
        ),
      )
      if (parentFieldName === fieldName) {
        parentUri = {
          fieldName: parentFieldName,
          editValue: record[fieldName],
        }
      }
    } else {
      tempProps.push(generateProperty(prop))
    }
  })

  let retval = generateResource(tempProps, record.pk)
  setResourceParent(retval, parentUri)
  return retval
}

/**
 *
 */
export function setResourceParent(rd, parentUri) {
  rd.parentUri = parentUri
}

/**
 * 得到某资源在资源树中的层级
 * @param {Object} res
 */
export function getResourceTreeLevel(res) {
  let parent = res.parentUri
  let level = 0
  for (; parent; level++) {
    parent = parent.parentUri
  }
  return level
}

/**
 * 生成树资源
 *
 */
export function generateTreeResources(nodeData, isExistRoot, treeRoot) {
  if (!nodeData) {
    return
  }
  var tempNodeData = _.cloneDeep(nodeData)
  // 先得到一级子节点
  var firstLevelNodes = []
  for (var i = tempNodeData.length - 1; i >= 0; i--) {
    if (!tempNodeData[i].parentUri) {
      firstLevelNodes.push(tempNodeData[i])
      tempNodeData.splice(i, 1)
    }
  }

  // 深度遍历
  setChildren(firstLevelNodes, tempNodeData)

  //
  var retval = []
  if (!isExistRoot) {
    retval = firstLevelNodes
  } else {
    treeRoot.childrenObj = firstLevelNodes
    retval.push(treeRoot)
  }
  return retval
}

/**
 * 查找树节点的孩子
 */
function setChildren(nodes, nodeData) {
  nodes.forEach(node => {
    var childrenObj = []
    for (var i = nodeData.length - 1; i >= 0; i--) {
      if (nodeData[i].parentUri.editValue === node.uri) {
        childrenObj.push(nodeData[i])
        nodeData.splice(i, 1)
      }
    }
    node.childrenObj = childrenObj
    if (node.childrenObj.length != 0) {
      setChildren(node.childrenObj, nodeData)
    }
  })
}
