# DisplayObject

> DisplayObject是一个抽象类，不应该直接构造。取而代之的是构造诸如Container、Bitmap和Shape之类的子类。DisplayObject是**星空**库中所有显示类的基类。它定义了所有显示对象之间共享的核心属性和方法，例如转换属性(x、y、scaleX、scaleY等)、缓存和鼠标处理程序。