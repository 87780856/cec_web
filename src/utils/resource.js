/**
 * 资源描述对象属性
 * @param {Object} attrObj 可选，构造对象可包含如下对象属性
   {
      fieldName,    {String} 属性名
      editValue,    {String} 属性值
      comparison,   {String} 比较符
      displayValue, {String} 显示值
      oldEditValue, {String} 旧显示值
      editable,     {Boolean} 可编辑状态
      editing,      {Boolean} 正在编辑状态
   }
 */
export function CAttribute(attrObj) {
  //// 私有属性
  // 属性名
  this.fieldName = null
  // 最新编辑角色数据
  this.editValue = null
  // 查询操作符，具体参照django的Fields的lookup分词
  this.comparison = 'exact'
  // 显示角色数据，创建后默认为编辑角色数据
  this.displayValue = null
  // 原编辑角色数据，创建后默认为编辑角色数据
  this.oldEditValue = null
  // 是否可编辑
  this.editable = false
  // 是否正在编辑
  this.editing = false

  /////////////////////////////////////////////////////////
  // 构造函数安全模式，避免创建时候丢掉new关键字
  if (!this instanceof CAttribute) {
    return undefined
  }

  // 构造
  if (attrObj) {
    var tempDisplayValue = null
    if (attrObj.displayValue) {
      // 注意显示值需要转换
      tempDisplayValue = attrObj.displayValue
    } else {
      if (attrObj.editValue) {
        tempDisplayValue = attrObj.editValue
      }
    }
    var tempOldEditValue = null
    if (attrObj.oldEditValue) {
      tempOldEditValue = attrObj.oldEditValue
    } else {
      if (attrObj.editValue) {
        tempOldEditValue = attrObj.editValue
      }
    }

    this.fieldName = attrObj.fieldName
    this.editValue = attrObj.editValue
    this.comparison = attrObj.comparison ? attrObj.comparison : 'exact'
    this.displayValue = tempDisplayValue
    this.oldEditValue = tempOldEditValue
    this.editable = attrObj.editable ? attrObj.editable : false
    this.editing = attrObj.editing ? attrObj.editing : false
  }

  //// 其它公有方法
  /**
   * 赋值属性
   * 将源CAttribute对象写入到目标CAttribute对象中
   * @param {Object} sourceCProp 源赋值属性
   */
  if (typeof this.assignAttribute != 'function') {
    CAttribute.prototype.assignAttribute = function(sourceCProp) {
      if (!sourceCProp) {
        return
      }
      var that = this
      Object.keys(that).forEach(key => {
        that[key] = sourceCProp[key]
      })
    }
  }

  //// 公有set、get方法
  if (typeof this.getFieldName != 'function') {
    CAttribute.prototype.getFieldName = function() {
      return this.fieldName
    }
  }
  if (typeof this.setFieldName != 'function') {
    CAttribute.prototype.setFieldName = function(fieldName) {
      this.fieldName = fieldName
    }
  }
  if (typeof this.getEditValue != 'function') {
    CAttribute.prototype.getEditValue = function() {
      return this.editValue
    }
  }
  if (typeof this.setEditValue != 'function') {
    CAttribute.prototype.setEditValue = function(editValue) {
      this.editValue = editValue
    }
  }
  if (typeof this.getComparison != 'function') {
    CAttribute.prototype.getComparison = function() {
      return this.comparison
    }
  }
  if (typeof this.setComparison != 'function') {
    CAttribute.prototype.setComparison = function(comparison) {
      this.comparison = comparison
    }
  }
  if (typeof this.getDisplayValue != 'function') {
    CAttribute.prototype.getDisplayValue = function() {
      return this.displayValue
    }
  }
  if (typeof this.setDisplayValue != 'function') {
    CAttribute.prototype.setDisplayValue = function(displayValue) {
      this.displayValue = displayValue
    }
  }
  if (typeof this.getOldEditValue != 'function') {
    CAttribute.prototype.getOldEditValue = function() {
      return this.oldEditValue
    }
  }
  if (typeof this.setOldEditValue != 'function') {
    CAttribute.prototype.setOldEditValue = function(oldEditValue) {
      this.oldEditValue = oldEditValue
    }
  }
  if (typeof this.getEditable != 'function') {
    CAttribute.prototype.getEditable = function() {
      return this.editable
    }
  }
  if (typeof this.setEditable != 'function') {
    CAttribute.prototype.setEditable = function(editable) {
      this.editable = editable
    }
  }
  if (typeof this.getEditing != 'function') {
    CAttribute.prototype.getEditing = function() {
      return this.editing
    }
  }
  if (typeof this.setEditing != 'function') {
    CAttribute.prototype.setEditing = function(editing) {
      this.editing = editing
    }
  }
}
/**
 * 资源描述对象
 * @param {Array} attributes                  可选，数组对象参见CAttribute
 * @param {String} typeName                   可选，该资源类型
 * @param {String} primaryAttributeName       可选，该资源主属性名
 * @param {String} primaryAttributeValue      可选，该资源主属性值，可为null，如果为空则自动生成
 * @param {String} associationTypeName        可选，关联类名
 * @param {String} associationAttributeName   可选，关联属性名
 * @param {String} associationAttributeValue  可选，关联属性值
 *
 */
export function CResource(resourceObj) {
  //// 私有属性
  // 资源类型名
  this.typeName = null
  // 资源主属性
  this.primaryAttributeName = null
  // 包含具体值
  this.primaryAttributeValue = uuid()
  // （树）关联类名
  this.associationTypeName = null
  // （树）关联属性名
  this.associationAttributeName = null
  // （树）关联属性值
  this.associationAttributeValue = null
  // 是否被选择
  this.selected = false
  // 差异改变状态，资源被改变时该值会设置相应差异,默认为null 可选值 DIFFERENCE_ADDED,DIFFERENCE_REMOVED,DIFFERENCE_MODIFIED
  this.difference = null
  // （树）树子节点对象列表
  this.children = [
    // CResource对象
  ]
  // （树）树节点是否被禁用，true为禁用
  this.disabled = false
  // （树）树节点是否被扩展，true为扩展
  this.expanded = false
  // 属性列表
  this.attributes = [
    // CAttribute对象
  ]

  // 构造函数安全模式，避免创建时候丢掉new关键字
  if (!this instanceof CResource) {
    return undefined
  }

  // 构造
  if (resourceObj) {
    this.typeName = resourceObj.typeName
    // 资源主属性
    this.primaryAttributeName = resourceObj.primaryAttributeName
    // 包含具体值
    this.primaryAttributeValue = resourceObj.primaryAttributeValue
    // （树）关联类名
    this.associationTypeName = resourceObj.associationTypeName
    // （树）关联属性名
    this.associationAttributeName = resourceObj.associationAttributeName
    // （树）关联属性值
    this.associationAttributeValue = resourceObj.associationAttributeValue
    // 是否被选择
    this.selected = resourceObj.selected ? resourceObj.selected : false
    // 差异改变状态，资源被改变时该值会设置相应差异,默认为null 可选值 DIFFERENCE_ADDED,DIFFERENCE_REMOVED,DIFFERENCE_MODIFIED
    this.difference = resourceObj.difference
    // （树）树子节点对象列表
    this.children = resourceObj.children
      ? resourceObj.children
      : [
          // CResource对象
        ]
    // （树）树节点是否被禁用，true为禁用
    this.disabled = resourceObj.disabled ? resourceObj.disabled : false
    // （树）树节点是否被扩展，true为扩展
    this.expanded = resourceObj.expanded ? resourceObj.expanded : false
    // 属性列表
    this.attributes =
      resourceObj.attributes && Array.isArray(resourceObj.attributes)
        ? (function(attributes) {
            var retval = []
            attributes.forEach(element => {
              retval.push(new CAttribute(element))
            })
            return retval
          })(resourceObj.attributes)
        : []
  }

  //// 其它方法
  /**
   * 设置资源每个属性的editing状态
   * @param {Boolean} editingFlag
   */
  if (typeof this.setEditing != 'function') {
    CResource.prototype.setEditing = function(editingFlag) {
      this.getAttributes().forEach(element => {
        if (element.getEditable()) {
          element.setEditing(editingFlag)
        }
      })
    }
  }
  /**
   * 修改资源中的index位置的一个属性,当前资源差异状态改为修改状态
   * @param {Integer} index 属性对象在资源属性列表中的索引
   * @param {Object} attrObj 属性对象
   */
  if (typeof this.modifyAttribute != 'function') {
    CResource.prototype.modifyAttribute = function(index, attrObj) {
      if (index >= this.getAttributes().length || index < 0) {
        return
      }

      this.getAttributes()[index].assignAttribute(attrObj)
      if (
        this.getDifference() !== DIFFERENCE_ADDED &&
        this.getDifference() !== DIFFERENCE_REMOVED
      ) {
        this.setDifference(DIFFERENCE_MODIFIED)
      }
    }
  }
  /**
   * 得到index位置的属性
   * @param {Integer} index 属性对象在资源属性列表中的索引
   */
  if (typeof this.getAttribute != 'function') {
    CResource.prototype.getAttribute = function(index) {
      if (index >= this.getAttributes().length || index < 0) {
        return
      }
      return this.getAttributes()[index]
    }
  }
  /**
   * 在子资源中追加一个资源,当前资源差异状态改为增加状态
   * @param {Object} cresource, CResource资源
   */
  if (typeof this.appendChild != 'function') {
    CResource.prototype.appendChild = function(cresource) {
      cresource.setDifference(DIFFERENCE_ADDED)
      this.getChildren().push(cresource)
    }
  }
  /**
   * 在子资源中删除一个资源,当前资源差异状态改为删除状态
   * @param {Integral} index 要删除的位置
   */
  if (typeof this.removeChild != 'function') {
    CResource.prototype.removeChild = function(index) {
      if (index <= 0 || index >= node.getChildren().length) {
        return
      }
      cresource.setDifference(DIFFERENCE_REMOVED)
      node.getChildren().splice(index, 1)
    }
  }
  /**
   * 删除多个子资源，这些资源差异状态改为删除状态
   * @param {Array} cresourceList 要删除的资源列表
   */
  if (typeof this.removeSelectedChildren != 'function') {
    CResource.prototype.removeSelectedChildren = function() {
      function setSelectedResource(node, selectedList) {
        for (var i = node.getChildren().length - 1; i >= 0; i--) {
          var child = node.getChildren()[i]
          // 如果是临时增加被删除的资源，则直接删除
          if (
            child.getSelected() &&
            DIFFERENCE_ADDED === child.getDifference()
          ) {
            node.getChildren().splice(i, 1)
            continue
          }
          if (child.getSelected()) {
            child.setDifference(DIFFERENCE_REMOVED)
            selectedList.push(child)
          }
          setSelectedResource(child, selectedList)
        }
      }
      var retval = []
      setSelectedResource(this, retval)

      return retval
    }
  }
  /**
   * 从resourceList中查找该资源的孩子，最后增加搜到的所有孩子
   * @param {Array} resourceList 要查找的孩子资源池
   */
  if (typeof this.addChildren != 'function') {
    CResource.prototype.addChildren = function(resourceList) {
      var children = []
      for (var i = resourceList.length - 1; i >= 0; i--) {
        if (
          resourceList[i].getAssociationTypeName() === this.getTypeName() &&
          resourceList[i].getAssociationAttributeValue() ===
            this.getPrimaryAttributeValue()
        ) {
          children.push(resourceList[i])
          resourceList.splice(i, 1)
        }
      }
      for (var j = 0; j < children.length; j++) {
        children[j].addChildren(resourceList)
      }
      this.setChildren(children)
    }
  }
  /**
   * 查找该资源与其子资源被选择的所有对象列表
   * @returns {Array} 返回被找到的资源列表
   */
  if (typeof this.findSelected != 'function') {
    CResource.prototype.findSelected = function() {
      function findSelectedResource(node, selectedList) {
        if (node.getSelected()) {
          selectedList.push(node)
        }
        node.getChildren().forEach(element => {
          findSelectedResource(element, selectedList)
        })
      }
      var retval = []
      findSelectedResource(this, retval)
      return retval
    }
  }

  /**
   * 查找资源状态为增删改的资源，得到资源差异模型包含自身及子资源
   * @returns {Object} 返回差异模型,增加不包含主键，更新含有主键，删除只包含主键
      {
        inserted: [{属性名:属性值}],
        updated: [{属性名:属性值}],
        removed: [主键值,xxx],
      }
   */
  if (typeof this.getDifferenceModel != 'function') {
    CResource.prototype.getDifferenceModel = function() {
      function setDifferenceResource(node, diffModel) {
        if (DIFFERENCE_ADDED === node.getDifference()) {
          let tempInserting = {}
          node.getAttributes().forEach(attr => {
            if (attr.getFieldName() !== node.getPrimaryAttributeName()) {
              tempInserting[attr.getFieldName()] = attr.getEditValue()
            }
          })
          diffModel.inserted.push(tempInserting)
        } else if (DIFFERENCE_MODIFIED === node.getDifference()) {
          let tempUpdating = {}
          node.getAttributes().forEach(attr => {
            if (attr.getEditValue() !== attr.getOldEditValue()) {
              tempUpdating[attr.getFieldName()] = attr.getEditValue()
            }
          })
          if (Object.keys(tempUpdating).length !== 0) {
            tempUpdating[
              'pk' //node.getPrimaryAttributeName() //暂时因为服务端解析问题先写成pk
            ] = node.getPrimaryAttributeValue()
            diffModel.updated.push(tempUpdating)
          }
        } else if (DIFFERENCE_REMOVED === node.getDifference()) {
          diffModel.removed.push(node.getPrimaryAttributeValue())
        }
        for (var i = node.getChildren().length - 1; i >= 0; i--) {
          setDifferenceResource(node.getChildren()[i], diffModel)
        }
      }
      let diffModel = {
        inserted: [],
        updated: [],
        removed: [],
      }
      setDifferenceResource(this, diffModel)

      if (
        diffModel.inserted.length === 0 &&
        diffModel.updated.length === 0 &&
        diffModel.removed.length === 0
      ) {
        diffModel = null
      }

      return diffModel
    }
  }

  /**
   * 保存自身及子资源，将差异状态还原为null
   *
   * @param {Array} addedRecords 被添加的记录，记录需要包含主键，记录顺序为getDifferenceModel插入资源的顺序
   */
  if (typeof this.saveChildren != 'function') {
    CResource.prototype.saveChildren = function(addedRecords) {
      // 算法跟getDifferenceModel的遍历算法保持一致，这样确保被添加的记录顺序一致
      function saveDiffResource(node, addedRecords, insertedIndex) {
        for (var i = node.getChildren().length - 1; i >= 0; i--) {
          var child = node.getChildren()[i]
          // 插入
          if (DIFFERENCE_ADDED === child.getDifference()) {
            // 设置主键
            child.setPrimaryAttributeValue(
              addedRecords[insertedIndex][child.getPrimaryAttributeName()],
            )

            ++insertedIndex
            child.setDifference(null)
          }
          // 更新
          else if (DIFFERENCE_MODIFIED === child.getDifference()) {
            child.getAttributes().forEach(attr => {
              attr.setOldEditValue(attr.getEditValue())
            })

            child.setDifference(null)
          } else if (DIFFERENCE_REMOVED === child.getDifference()) {
            node.getChildren().splice(i, 1)
            continue
          }
          saveDiffResource(child, addedRecords, insertedIndex)
        }
      }
      var retval = []
      var insertedIndex = 0
      saveDiffResource(this, addedRecords, insertedIndex)
      return retval
    }
  }

  //// 公有set、get方法
  if (typeof this.getTypeName != 'function') {
    CResource.prototype.getTypeName = function() {
      return this.typeName
    }
  }
  if (typeof this.setTypeName != 'function') {
    CResource.prototype.setTypeName = function(typeName) {
      this.typeName = typeName
    }
  }
  if (typeof this.getPrimaryAttributeName != 'function') {
    CResource.prototype.getPrimaryAttributeName = function() {
      return this.primaryAttributeName
    }
  }
  if (typeof this.setPrimaryAttributeName != 'function') {
    CResource.prototype.setPrimaryAttributeName = function(
      primaryAttributeName,
    ) {
      this.primaryAttributeName = primaryAttributeName
    }
  }
  if (typeof this.getPrimaryAttributeValue != 'function') {
    CResource.prototype.getPrimaryAttributeValue = function() {
      return this.primaryAttributeValue
    }
  }
  if (typeof this.setPrimaryAttributeValue != 'function') {
    CResource.prototype.setPrimaryAttributeValue = function(
      primaryAttributeValue,
    ) {
      this.primaryAttributeValue = primaryAttributeValue
    }
  }
  if (typeof this.getSelected != 'function') {
    CResource.prototype.getSelected = function() {
      return this.selected
    }
  }
  if (typeof this.setSelected != 'function') {
    CResource.prototype.setSelected = function(selected) {
      this.selected = selected
    }
  }
  if (typeof this.getDifference != 'function') {
    CResource.prototype.getDifference = function() {
      return this.difference
    }
  }
  if (typeof this.setDifference != 'function') {
    CResource.prototype.setDifference = function(difference) {
      this.difference = difference
    }
  }
  if (typeof this.getAssociationTypeName != 'function') {
    CResource.prototype.getAssociationTypeName = function() {
      return this.associationTypeName
    }
  }
  if (typeof this.setAssociationTypeName != 'function') {
    CResource.prototype.setAssociationTypeName = function(associationTypeName) {
      this.associationTypeName = associationTypeName
    }
  }
  if (typeof this.getAssociationAttributeName != 'function') {
    CResource.prototype.getAssociationAttributeName = function() {
      return this.associationAttributeName
    }
  }
  if (typeof this.setAssociationAttributeName != 'function') {
    CResource.prototype.setAssociationAttributeName = function(
      associationAttributeName,
    ) {
      this.associationAttributeName = associationAttributeName
    }
  }
  if (typeof this.getAssociationAttributeValue != 'function') {
    CResource.prototype.getAssociationAttributeValue = function() {
      return this.associationAttributeValue
    }
  }
  if (typeof this.setAssociationAttributeValue != 'function') {
    CResource.prototype.setAssociationAttributeValue = function(
      associationAttributeValue,
    ) {
      this.associationAttributeValue = associationAttributeValue
    }
  }
  if (typeof this.getChildren != 'function') {
    CResource.prototype.getChildren = function() {
      return this.children
    }
  }
  if (typeof this.setChildren != 'function') {
    CResource.prototype.setChildren = function(children) {
      this.children = children
    }
  }
  if (typeof this.getDisabled != 'function') {
    CResource.prototype.getDisabled = function() {
      return this.disabled
    }
  }
  if (typeof this.setDisabled != 'function') {
    CResource.prototype.setDisabled = function(disabled) {
      this.disabled = disabled
    }
  }
  if (typeof this.getExpanded != 'function') {
    CResource.prototype.getExpanded = function() {
      return this.expanded
    }
  }
  if (typeof this.setExpanded != 'function') {
    CResource.prototype.setExpanded = function(expanded) {
      this.expanded = expanded
    }
  }
  if (typeof this.getAttributes != 'function') {
    CResource.prototype.getAttributes = function() {
      return this.attributes
    }
  }
  if (typeof this.setAttributes != 'function') {
    CResource.prototype.setAttributes = function(attributes) {
      if (!attributes || !Array.isArray(attributes)) {
        return
      }
      attributes.forEach(element => {
        this.attributes.push(new CAttribute(element))
      })
    }
  }
}

//// 资源编辑枚举
export var DIFFERENCE_ADDED = 'row_added'
export var DIFFERENCE_REMOVED = 'row_removed'
export var DIFFERENCE_MODIFIED = 'row_modified'

//////////////////////////////////////////////////////////////////////////////
//
//////////////////////////////////////////////////////////////////////////////
/**
 * 设置资源序列的selected状态
 * @param {Array} sourceRds 源资源列表
 * @param {Array} selectedRds 已选择的资源列表
 */
export function setResourcesSelectedState(sourceRds, selectedRds) {
  if (!sourceRds || !Array.isArray(sourceRds)) {
    return
  }

  // 非选定资源
  var notSelectedRds = _.differenceWith(sourceRds, selectedRds, _.isEqual)
  if (notSelectedRds && Array.isArray(notSelectedRds)) {
    notSelectedRds.forEach(rd => {
      rd.setSelected(false)
    })
  }
  // 选定资源
  if (selectedRds && Array.isArray(selectedRds)) {
    selectedRds.forEach(rd => {
      rd.setSelected(true)
    })
  }
}
/**
 * 设置所有资源editing状态
 * @param {Array} rds 资源列表
 * @param {Boolean} editingFlag 正在编辑状态，true为正在编辑
 */
export function setResourcesEditingState(rds, editingFlag) {
  if (!rds) {
    return
  }
  rds.forEach(rd => {
    rd.setEditing(editingFlag)
  })
}
/**
 * 将record对象通过attrList属性约束列表转换并生成CResource资源
 * @param {String} typeName 该资源的类型
 * @param {String} primaryAttributeName 主属性名
 * @param {Object} record 转换前的资源数据
 * @param {Array} attrList 转换前的资源属性约束列表,格式参考CAttribute
 * [{ fieldName:xxx }]
 * @param {String} associationTypeName 关联类名
 * @param {String} associationAttributeName 关联属性名
 */
export function generate1Resource(
  typeName,
  primaryAttributeName,
  record,
  attrList,
  associationTypeName,
  associationAttributeName,
) {
  var attributes = []
  var primaryAttributeValue = null
  var associationAttributeValue = null
  if (attrList && Array.isArray(attrList)) {
    attrList.forEach(attr => {
      if (!record) {
        attributes.push(attr)
      } else {
        // 查找record列是否存在
        var fieldName = Object.keys(record).find(element => {
          return element === attr.fieldName
        })
        // 如果存在则设置属性的值
        if (fieldName) {
          attributes.push({
            fieldName,
            editValue: record[fieldName],
            comparison: attr.comparison,
            displayValue: attr.displayValue,
            oldEditValue: attr.oldEditValue,
            editable: attr.editable,
            editing: attr.editing,
          })
          if (primaryAttributeName === fieldName) {
            primaryAttributeValue = record[fieldName]
          }
          if (associationAttributeName === fieldName) {
            associationAttributeValue = record[fieldName]
          }
        } else {
          attributes.push(attr)
        }
      }
    })
  }
  var retval = new CResource({
    typeName,
    primaryAttributeName,
    primaryAttributeValue,
    associationTypeName,
    associationAttributeName,
    associationAttributeValue,
    attributes,
  })
  return retval
}
/**
 * 将records对象列表通过attrList属性约束列表转换并生成所有CResource资源列表
 * @param {String} typeName 该资源的类型
 * @param {String} primaryAttributeName 主属性名
 * @param {Array} recordList 转换前的资源列表数据
 * @param {Array} attrList 转换前的资源属性约束列表,格式参考CAttribute
 * [{ fieldName:xxx }]
 * @param {String} associationTypeName 关联类名
 * @param {String} associationAttributeName 关联属性名
 * @param {Boolean} isExistRoot 是否存在根
 * @param {String} treeRoot 树根CResource资源对象
 */
export function generateResources(
  typeName,
  primaryAttributeName,
  recordList,
  attrList,
  associationTypeName,
  associationAttributeName,
  isExistRoot,
  treeRoot,
) {
  if (!recordList) {
    return null
  }
  var resourceList = []
  recordList.forEach(element => {
    var res = generate1Resource(
      typeName,
      primaryAttributeName,
      element,
      attrList,
      associationTypeName,
      associationAttributeName,
    )
    if (res) {
      resourceList.push(res)
    }
  })

  var retval = []
  // 如果要自关联生成父子树结构
  if (typeName === associationTypeName) {
    // 先得到一级子节点
    var firstLevelNodes = []
    for (var i = resourceList.length - 1; i >= 0; i--) {
      if (
        !resourceList[i].getAssociationTypeName() ||
        !resourceList[i].getAssociationAttribute() ||
        !resourceList[i].getAssociationAttributeValue()
      ) {
        firstLevelNodes.push(resourceList[i])
        resourceList.splice(i, 1)
      }
    }
    // 查找孩子并加入孩子
    for (var j = 0; j < firstLevelNodes.length; j++) {
      firstLevelNodes[j].addChildren(resourceList)
    }

    //
    var retval = []
    if (!isExistRoot) {
      retval = firstLevelNodes
    } else {
      if (treeRoot && typeof treeRoot === 'CResource') {
        treeRoot.setChildren(firstLevelNodes)
        retval.push(treeRoot)
      } else {
        retval = firstLevelNodes
      }
    }
  } else {
    retval = resourceList
  }

  return retval
}

/**
 * 是否存在被选择的资源
 * @param {Array} cresourceList
 * @returns {Boolean} 是为true 否为false
 */
export function hasResourcesSelected(cresourceList) {
  if (!cresourceList || !Array.isArray(cresourceList)) {
    return false
  }

  for (var i = 0; i < cresourceList.length; i++) {
    var tempList = cresourceList[i].findSelected()
    if (tempList && tempList.length > 0) {
      return true
    }
  }
  return false
}

//////////////////////////////////////////////////////////////////////////////
//
//////////////////////////////////////////////////////////////////////////////

//// 资源描述对象
// {
//   uri: xxx,                // 必填 对象唯一id
//   selected: false,         // 可选 是否被选择，默认为未选择false
//   difference: null         // 可选 修改状态下的改变差异，该资源被改变该值会设置相应差异,默认为null 可选值 DIFFERENCE_ADDED,DIFFERENCE_REMOVED,DIFFERENCE_MODIFIED
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
  props.push(new CAttribute(prop))
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
    retval.push(new CAttribute(element))
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
 * 获得rd资源的差异状态
 * @param {Object} rd 资源
 * @returns {String} 增加返回'ROW_ADDED',删除返回'ROW_REMOVED'，修改返回'ROW_MODIFIED'，其它返回null
 */
export function getResourceDifferenceState(rd) {
  if (!rd) {
    return null
  }
  if (rd.difference === DIFFERENCE_ADDED) {
    return 'ROW_ADDED'
  } else if (rd.difference === DIFFERENCE_REMOVED) {
    return 'ROW_REMOVED'
  } else if (rd.difference === DIFFERENCE_MODIFIED) {
    return 'ROW_MODIFIED'
  } else {
    return null
  }
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
  rd.difference = DIFFERENCE_ADDED
  if (rds) {
    rds.push(rd)
  }
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
    if (rd.difference === DIFFERENCE_ADDED) {
      rd.uri = addedRecords[insertedIndex].pk
      ++insertedIndex
      rd.difference = null
    }
    // 更新
    else if (rd.difference === DIFFERENCE_MODIFIED) {
      rd.props.forEach(prop => {
        prop.oldEditValue = prop.editValue
      })
      rd.difference = null
    } else if (rd.difference === DIFFERENCE_REMOVED) {
      removingIndexList.push(index)
    }
  })
  // 删除资源
  for (var i = removingIndexList.length - 1; i >= 0; i--) {
    rds.splice(removingIndexList[i], 1)
  }
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
        new CAttribute({
          fieldName,
          editValue: record[fieldName],
          comparison: prop.comparison,
          displayValue: prop.displayValue,
          oldEditValue: prop.oldEditValue,
          editable: prop.editable,
          editing: prop.editing,
        }),
      )
      if (parentFieldName === fieldName) {
        parentUri = {
          fieldName: parentFieldName,
          editValue: record[fieldName],
        }
      }
    } else {
      tempProps.push(new CAttribute(prop))
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
